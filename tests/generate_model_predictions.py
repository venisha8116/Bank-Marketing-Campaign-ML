import json
import joblib
from pathlib import Path

import pandas as pd


PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATASET_PATH = Path(
    r"D:\SEM-5\ML\Projects\Bank Marketing\Datasets\bank-additional-full.csv"
)

MODEL_PATH = PROJECT_ROOT / "models" / "naive_bayes_model.pkl"
SCALER_PATH = PROJECT_ROOT / "models" / "scaler.pkl"

OUTPUT_PATH = PROJECT_ROOT / "tests" / "model_parity_data.json"


# Load dataset
df = pd.read_csv(DATASET_PATH, sep=";")

# Select the same real rows every time
samples = df.sample(
    n=min(10, len(df)),
    random_state=42
).copy()

# Load the trained model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)


categorical_groups = [
    "job",
    "marital",
    "education",
    "default",
    "housing",
    "loan",
    "month",
    "day_of_week",
    "poutcome",
]

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

    # Create the same encoded feature structure used by the model
    X = pd.DataFrame([input_row])

    X = pd.get_dummies(
        X,
        columns=categorical_groups,
        dtype=float
    )

    # Convert contact to the binary representation used by the frontend
    X["contact"] = (
        X["contact"]
        .map({
            "cellular": 1.0,
            "telephone": 0.0,
        })
        .astype(float)
    )

    # Match the exact feature order used during training
    if hasattr(model, "feature_names_in_"):
        X = X.reindex(
            columns=model.feature_names_in_,
            fill_value=0.0
        )

    # Make sure numerical columns are floating point
    X[scaler_columns] = X[scaler_columns].astype(float)

    # Standardize numerical features using the saved scaler.
    # Passing a DataFrame preserves the scaler's feature names.
    X.loc[:, scaler_columns] = scaler.transform(
        X[scaler_columns]
    )

    # Generate prediction using the actual trained model
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
        ),
    })


# Save temporary test data for Playwright
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