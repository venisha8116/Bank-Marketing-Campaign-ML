from fastapi import APIRouter, HTTPException, Response, status

from ..core.config import MODEL_METADATA
from ..schemas.predict import PredictionRequest, PredictionResponse
from ..services import predictor

router = APIRouter(prefix="/api", tags=["Prediction"])


@router.get("/health", summary="Service health check")
def health() -> dict:
    return {
        "status": "ok" if predictor.is_loaded() else "degraded",
        "modelLoaded": predictor.is_loaded(),
        "model": MODEL_METADATA["algorithm"],
        "featuresUsed": MODEL_METADATA["featuresUsed"],
    }


@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict whether a customer will subscribe",
    description=(
        "Encodes the provided customer and campaign features exactly like the training pipeline, "
        "runs the Gaussian Naive Bayes model, and returns the subscription analysis."
    ),
)
def predict(payload: PredictionRequest) -> PredictionResponse:
    try:
        return predictor.analyze(payload.model_dump(by_alias=True))
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid feature value: {error}",
        ) from error
    except predictor.PredictionError as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(error),
        ) from error
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction could not be completed: {error}",
        ) from error