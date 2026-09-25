from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

MODEL_PATH = PROJECT_ROOT / "models" / "naive_bayes_model.pkl"
SCALER_PATH = PROJECT_ROOT / "models" / "scaler.pkl"

API_TITLE = "Bank Marketing Campaign Prediction API"
API_VERSION = "1.0.0"
API_DESCRIPTION = (
    "Backend service for the Bank Marketing Campaign project. "
    "Accepts the customer and campaign features collected by the frontend form "
    "and returns a subscription analysis produced by the trained Gaussian Naive Bayes model."
)

CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
    "https://bank-marketing-campaign-ml.vercel.app",
]

CATEGORICAL_GROUPS = [
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

SCALER_COLUMNS = [
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

CONTACT_ENCODING = {
    "cellular": 1.0,
    "telephone": 0.0,
}

MODEL_METADATA = {
    "name": "Naive Bayes",
    "algorithm": "Gaussian Naive Bayes",
    "library": "scikit-learn (GaussianNB)",
    "problemType": "Binary Classification",
    "target": "y (0 = No, 1 = Yes)",
    "featuresUsed": 59,
    "trainingSetSize": 32620,
    "testSetSize": 8155,
    "hyperparameters": {"var_smoothing": 1e-09},
    "selectionReason": (
        "Selected in the notebook because the project prioritizes identifying potential subscribers. "
        "It achieved the highest recall among the tested models and the lowest number of false negatives "
        "in the final confusion-matrix comparison."
    ),
    "metrics": {
        "accuracy": 0.8083,
        "precision": 0.3201,
        "recall": 0.6235,
        "f1": 0.423,
        "rocAuc": 0.7715,
    },
}