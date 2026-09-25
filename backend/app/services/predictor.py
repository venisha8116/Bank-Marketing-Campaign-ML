import math
from datetime import datetime, timezone

import joblib
import pandas as pd

from ..core.config import (
    CATEGORICAL_GROUPS,
    CONTACT_ENCODING,
    MODEL_METADATA,
    MODEL_PATH,
    SCALER_COLUMNS,
    SCALER_PATH,
)
from ..schemas.predict import (
    FeatureContribution,
    ModelInfo,
    ModelInput,
    ModelMetrics,
    PredictionResponse,
)

_model = None
_scaler = None


class PredictionError(RuntimeError):
    pass


def load() -> None:
    global _model, _scaler
    if _model is None:
        try:
            _model = joblib.load(MODEL_PATH)
        except Exception as error:
            raise PredictionError(f"Could not load the Naive Bayes model: {error}") from error
    if _scaler is None:
        try:
            _scaler = joblib.load(SCALER_PATH)
        except Exception as error:
            raise PredictionError(f"Could not load the StandardScaler: {error}") from error


def unload() -> None:
    global _model, _scaler
    _model = None
    _scaler = None


def is_loaded() -> bool:
    return _model is not None and _scaler is not None


def _build_feature_frame(payload: dict) -> pd.DataFrame:
    """Recreate the exact feature encoding used during model training."""
    frame = pd.DataFrame([payload])

    frame["contact"] = (
        frame["contact"].map(CONTACT_ENCODING).astype(float)
    )
    frame = pd.get_dummies(frame, columns=CATEGORICAL_GROUPS, dtype=float)
    frame = frame.reindex(columns=_model.feature_names_in_, fill_value=0.0)
    frame[SCALER_COLUMNS] = frame[SCALER_COLUMNS].astype(float)
    frame.loc[:, SCALER_COLUMNS] = _scaler.transform(frame[SCALER_COLUMNS])

    return frame


def _gaussian_log_probability(x: float, mean: float, variance: float) -> float:
    return -0.5 * (
        math.log(2 * math.pi * variance)
        + ((x - mean) ** 2) / variance
    )


def analyze(payload: dict) -> PredictionResponse:
    load()

    frame = _build_feature_frame(payload)
    probabilities = _model.predict_proba(frame)[0]
    prob_no = float(probabilities[0])
    prob_yes = float(probabilities[1])
    prediction = "yes" if prob_yes >= 0.5 else "no"
    confidence = max(prob_no, prob_yes)

    row = frame.iloc[0]
    features = list(_model.feature_names_in_)
    theta = _model.theta_
    variance = _model.var_
    prior = _model.class_prior_

    model_inputs: list[ModelInput] = []
    contributions: list[FeatureContribution] = []

    for index, name in enumerate(features):
        value = float(row[name])
        model_inputs.append(ModelInput(feature=name, value=round(value, 6)))

        log_likelihood_yes = _gaussian_log_probability(value, theta[1][index], variance[1][index])
        log_likelihood_no = _gaussian_log_probability(value, theta[0][index], variance[0][index])
        contribution = log_likelihood_yes - log_likelihood_no
        contributions.append(
            FeatureContribution(feature=name, contribution=round(contribution, 6))
        )

    contributions.sort(key=lambda item: item.contribution, reverse=True)

    metrics = MODEL_METADATA["metrics"]
    model_info = ModelInfo(
        name=MODEL_METADATA["name"],
        algorithm=MODEL_METADATA["algorithm"],
        library=MODEL_METADATA["library"],
        problemType=MODEL_METADATA["problemType"],
        target=MODEL_METADATA["target"],
        featuresUsed=MODEL_METADATA["featuresUsed"],
        trainingSetSize=MODEL_METADATA["trainingSetSize"],
        testSetSize=MODEL_METADATA["testSetSize"],
        metrics=ModelMetrics(
            accuracy=metrics["accuracy"],
            precision=metrics["precision"],
            recall=metrics["recall"],
            f1=metrics["f1"],
            rocAuc=metrics["rocAuc"],
        ),
    )

    log_prior_ratio = math.log(prior[1]) - math.log(prior[0])
    contributions.append(
        FeatureContribution(feature="(class prior)", contribution=round(log_prior_ratio, 6))
    )

    feature_drivers = [item.feature for item in contributions if not item.feature.startswith("(")]
    top_positive = feature_drivers[:5]
    top_negative = feature_drivers[-5:][::-1]

    return PredictionResponse(
        status="success",
        prediction=prediction,
        probability=round(prob_yes, 6),
        confidence=round(confidence, 6),
        probabilities={"no": round(prob_no, 6), "yes": round(prob_yes, 6)},
        modelUsed=MODEL_METADATA["algorithm"],
        model=model_info,
        modelInputs=model_inputs,
        featureContributions=contributions,
        topPositiveDrivers=top_positive,
        topNegativeDrivers=top_negative,
        generatedAt=datetime.now(timezone.utc).isoformat(),
    )