import json
import joblib
from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATASET_PATH = Path(
    r"D:\SEM-5\ML\Projects\Bank Marketing\Datasets\bank-additional-full.csv"
)

MODEL_PATH = (
    PROJECT_ROOT
    / "models"
    / "naive_bayes_model.pkl"
)

SCALER_PATH = (
    PROJECT_ROOT
    / "models"
    / "scaler.pkl"
)

OUTPUT_PATH = (
    PROJECT_ROOT
    / "tests"
    / "model_parity_data.json"
)


# Load dataset
df = pd.read_csv(DATASET_PATH, sep=";")

# Use real rows from the dataset
samples = df.sample(
    n=min(10, len(df)),
    random_state=42
).copy()


# Load trained model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


categorical_groups = {
    "job": [
        "admin.", "blue-collar", "entrepreneur", "housemaid",
        "management", "retired", "self-employed", "services",
        "student", "technician", "unemployed"
    ],

    "marital": [
        "divorced", "married", "single"
    ],

    "education": [
        "basic.4y", "basic.6y", "basic.9y", "high.school",
        "illiterate", "professional.course",
        "university.degree", "unknown"
    ],

    "default": ["no", "unknown", "yes"],
    "housing": ["no", "unknown", "yes"],
    "loan": ["no", "unknown", "yes"],

    "month": [
        "apr", "aug", "dec", "jul", "jun",
        "mar", "may", "nov", "oct", "sep"
    ],

    "day_of_week": [
        "fri", "mon", "thu", "tue", "wed"
    ],

    "poutcome": [
        "failure", "nonexistent", "success"
    ],
}


numerical = [
    "age",
    "campaign",
    "pdays",
    "previous",
    "emp.var.rate",
    "cons.price.idx",
    "cons.conf.idx",
    "euribor3m",
    "nr.employed",
]


def build_frontend_features(row):
    features = {}

    # Contact is represented as 0/1
    features["contact"] = (
        1 if row["contact"] == "cellular" else 0
    )

    for name in numerical:
        features[name] = float(row[name])

    # One-hot categorical features
    for field, values in categorical_groups.items():
        for value in values:
            features[f"{field}_{value}"] = 0

        value = row[field]

        if value in values:
            features[f"{field}_{value}"] = 1

    return features


results = []


for _, row in samples.iterrows():

    # Remove target and leakage column
    input_row = {
        column: row[column]
        for column in df.columns
        if column not in ["y", "duration"]
    }

    # Convert values into the same payload expected by frontend
    payload = {
        "age": str(row["age"]),
        "job": row["job"],
        "marital": row["marital"],
        "education": row["education"],
        "default": row["default"],
        "housing": row["housing"],
        "loan": row["loan"],
        "contact": row["contact"],
        "month": row["month"],
        "day_of_week": row["day_of_week"],
        "campaign": str(row["campaign"]),
        "pdays": str(row["pdays"]),
        "previous": str(row["previous"]),
        "poutcome": row["poutcome"],
        "emp.var.rate": str(row["emp.var.rate"]),
        "cons.price.idx": str(row["cons.price.idx"]),
        "cons.conf.idx": str(row["cons.conf.idx"]),
        "euribor3m": str(row["euribor3m"]),
        "nr.employed": str(row["nr.employed"]),
    }

    # Build the same feature dictionary
    feature_dict = build_frontend_features(row)

    # Match the frontend's feature order
    feature_names = [
        name
        for name in feature_dict.keys()
    ]

    # The actual frontend feature order is stored in projectData.js.
    # For parity, load the exact feature list from the trained model
    # when available.
    if hasattr(model, "n_features_in_"):
        expected_count = model.n_features_in_
    else:
        expected_count = None

    # Build the feature vector in the same order used by
    # the project model.
    #
    # The project uses the saved scaler's feature order for
    # numerical standardization.
    numeric_values = [
        float(row["age"]),
        float(row["campaign"]),
        float(row["pdays"]),
        float(row["previous"]),
        float(row["emp.var.rate"]),
        float(row["cons.price.idx"]),
        float(row["cons.conf.idx"]),
        float(row["euribor3m"]),
        float(row["nr.employed"]),
    ]

    scaled_numeric = scaler.transform(
        [numeric_values]
    )[0]

    # Reconstruct the encoded feature matrix using the
    # same pandas one-hot ordering used during training.
    X = pd.DataFrame([input_row])

    X = pd.get_dummies(
        X,
        columns=list(categorical_groups.keys()),
        dtype=int
    )

    # Contact is converted to binary
    X["contact"] = (
        X["contact"]
        .map({"cellular": 1, "telephone": 0})
        .astype(int)
    )

    # Make sure the feature count matches the trained model.
    # Missing columns are filled with zero.
    if hasattr(model, "feature_names_in_"):
        X = X.reindex(
            columns=model.feature_names_in_,
            fill_value=0
        )

    # Standardize numerical columns
    scaler_columns = [
        "age",
        "campaign",
        "pdays",
        "previous",
        "emp.var.rate",
        "cons.price.idx",
        "cons.conf.idx",
        "euribor3m",
        "nr.employed",
    ]

    available_scaler_columns = [
        column
        for column in scaler_columns
        if column in X.columns
    ]

    if available_scaler_columns:
        X.loc[:, available_scaler_columns] = scaler.transform(
            X[available_scaler_columns]
        )

    python_probability = model.predict_proba(X)[0][1]
    python_prediction = (
        "yes"
        if python_probability >= 0.5
        else "no"
    )

    results.append({
        "input": payload,
        "pythonPrediction": python_prediction,
        "pythonProbability": round(
            float(python_probability),
            6
        )
    })


with open(
    OUTPUT_PATH,
    "w",
    encoding="utf-8"
) as file:
    json.dump(
        results,
        file,
        indent=2
    )

print(
    f"Generated {len(results)} model parity samples."
)