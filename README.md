# Bank Marketing Campaign ML

An end-to-end machine learning project for predicting whether a bank customer is likely to subscribe to a term deposit. The repository combines exploratory data analysis, data cleaning and preprocessing, model training and comparison, saved model artifacts, and a React/Vite dashboard with an interactive prediction form.

## Project Overview

The project uses customer, campaign, previous-contact, and economic information to study subscription behavior and perform binary classification for the target variable `y`.

The repository contains:

- Jupyter notebooks for EDA, preprocessing, model training, and evaluation.
- Saved Gaussian Naive Bayes and scaler artifacts in `models/`.
- A React frontend that presents the dataset and analysis and collects the customer/campaign inputs for prediction.
- A FastAPI backend that serves the trained model: it loads the pickle artifacts, accepts the frontend feature payload, and returns the subscription analysis (Swagger UI at `/docs`).

The frontend calls the backend for predictions and falls back to the in-browser Naive Bayes implementation only when the API is unreachable.

## Problem Statement

The target variable is `y`:

- `yes`: the customer subscribed to a term deposit.
- `no`: the customer did not subscribe.

The goal is to predict whether a customer will subscribe based on available customer, campaign, prior-contact, and economic information.

## Dataset

| Item | Verified details |
|---|---|
| Dataset | `bank-additional-full.csv` |
| Source | UCI Machine Learning Repository — Bank Marketing dataset |
| Raw records | 41,188 |
| Raw columns | 21, including the target |
| Raw numerical features | 10 |
| Raw categorical features | 10 |
| Target variable | `y` |
| Classes | `no`, `yes` |
| Records after unknown-value cleaning | 40,787 |
| Records after duplicate removal | 40,775 |
| Final model features | 59 |

The raw columns cover customer demographics, contact and campaign information, previous campaign outcomes, and economic indicators. Examples include `age`, `job`, `marital`, `education`, `contact`, `month`, `campaign`, `pdays`, `previous`, `poutcome`, `emp.var.rate`, `cons.price.idx`, `cons.conf.idx`, `euribor3m`, and `nr.employed`.

Additional dataset characteristics documented by the project:

- `pdays = 999` represents a customer who was not previously contacted.
- The raw dataset contains no `NaN` values.
- The target is imbalanced: 36,548 records are `no` and 4,640 are `yes`.
- The raw CSV is referenced by the notebooks but is not included in this repository.

## Machine Learning Workflow

```text
Dataset
  → Exploratory Data Analysis
  → Data Cleaning
  → Feature Encoding and Numerical Preparation
  → Train/Test Split
  → Model Training
  → Model Evaluation
  → Model Comparison
  → Final Gaussian Naive Bayes Model
  → FastAPI Prediction API
  → Frontend Prediction Interface
```

## Exploratory Data Analysis

`notebooks/EDA.ipynb` examines dataset shape, data types, summary statistics, missing values, categorical values, duplicates, distributions, and relationships with the target. The frontend reproduces the main findings through visualizations for:

- Target distribution.
- Customers by job.
- Contact method versus subscription.
- Subscription by campaign month.
- Previous campaign outcome versus subscription.
- Previous-contact/prior-contact behavior.

Verified findings documented in the project include:

- The target is heavily imbalanced: 36,548 customers did not subscribe and 4,640 subscribed.
- Previous campaign outcome, contact method, month, and prior-contact status are identified as important individual signals.
- Customers with a previous successful campaign outcome have substantially higher subscription rates than the other previous-outcome groups.
- Cellular contact is more common than telephone contact: 26,144 versus 15,044 records.
- `emp.var.rate`, `euribor3m`, and `nr.employed` move together strongly, indicating overlapping macroeconomic information.
- Subscribers have lower documented average `emp.var.rate`, `euribor3m`, and `nr.employed` values than non-subscribers.
- The frontend EDA page states that the correlation heat map was removed from that page.

## Data Preprocessing

`notebooks/DataPreprocessing.ipynb` documents the following process:

1. Load `bank-additional-full.csv` with `;` as the separator.
2. Inspect shape, data types, null values, literal `unknown` values, and duplicate rows.
3. Remove rows with `unknown` in `job` (330 rows) and `marital` (80 rows).
4. Remove 12 duplicate rows after the unknown-value cleaning step.
5. Retain other categorical `unknown` values that remain in the project feature definitions. No `NaN` imputation is needed because the raw data contains zero `NaN` values.
6. Exclude `duration` before model training. The project identifies it as target leakage because it is only known after the call.
7. Encode categorical variables and prepare numerical variables, resulting in 59 model features.
8. Scale the numerical model features using the saved scaler.
9. Prepare the target as a binary value: `no = 0` and `yes = 1`.

## Models Evaluated

The model-training notebook evaluates these classifiers:

| Model | Role |
|---|---|
| Logistic Regression | Linear binary-classification baseline. |
| Decision Tree | Rule-based classifier using feature splits. |
| Random Forest | Ensemble of decision trees. |
| AdaBoost | Boosting classifier that focuses successively on difficult observations. |
| Gradient Boosting | Sequential boosting ensemble. |
| K-Nearest Neighbors (KNN) | Distance-based classifier using nearby training examples. |
| Gaussian Naive Bayes | Probabilistic classifier using class priors and Gaussian feature likelihoods. |

## Model Evaluation

The project compares accuracy, precision, recall, F1 score, and ROC-AUC. The comparison values stored in `frontend/src/data/projectData.js` are:

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.9003 | 0.684 | 0.2144 | 0.3264 | 0.7973 |
| Decision Tree | 0.8401 | 0.3077 | 0.3351 | 0.3208 | 0.6202 |
| Random Forest | 0.8974 | 0.6005 | 0.2666 | 0.3693 | 0.7957 |
| AdaBoost | 0.9001 | 0.7 | 0.198 | 0.3087 | 0.8038 |
| Gradient Boosting | 0.8987 | 0.626 | 0.2514 | 0.3587 | 0.8093 |
| KNN | 0.8743 | 0.4169 | 0.2894 | 0.3417 | 0.6985 |
| Gaussian Naive Bayes | 0.8083 | 0.3201 | 0.6235 | 0.423 | 0.7715 |

### Selected-model results

The recorded results for Gaussian Naive Bayes are:

- **Accuracy:** `0.8083`
- **Precision:** `0.3201`
- **Recall:** `0.6235`
- **F1 score:** `0.423`
- **ROC-AUC:** `0.7715`

Confusion matrix:

|  | Predicted No | Predicted Yes |
|---|---:|---:|
| Actual No | 6,019 | 1,217 |
| Actual Yes | 346 | 573 |

The training and test sets contain 32,620 and 8,155 rows respectively, with 59 features in each feature matrix.

## Final Selected Model

The final selected model is **Gaussian Naive Bayes** from scikit-learn (`GaussianNB`), with `var_smoothing = 1e-09`.

The project records that it was selected because the project prioritizes identifying potential subscribers. It achieved the highest recall among the tested models (`0.6235`) and the lowest recorded number of false negatives. This selection is therefore recall-oriented; several other models have higher accuracy or precision.

## Prediction System

Prediction runs through the FastAPI backend by default, with an in-browser fallback.

### Backend flow (primary)

1. The user completes fields on the prediction page grouped into customer information, campaign information, previous campaign information, and economic context.
2. `frontend/src/services/predictionService.js` POSTs the raw form payload to `POST /api/predict` on the backend.
3. `backend/app/services/predictor.py` recreates the exact training encoding: `contact` is label-encoded (`cellular = 1`, `telephone = 0`), the nominal columns are one-hot encoded, the numeric `scaler` features are standardized, and the vector is re-ordered to the model's `feature_names_in_`.
4. The Gaussian Naive Bayes model computes class probabilities and the API returns the prediction plus analysis: class probabilities, confidence, model metadata, the encoded feature vector, per-feature log-odds contributions, and the top positive/negative drivers.
5. The backend target model (`backend/app/main.py`) serves Swagger at `/docs`.

### Browser flow (fallback)

If the API is unreachable, `predictionService.js` falls back to the pure-JavaScript implementation in the same file. It imports `naiveBayesParameters` from `frontend/src/data/projectData.js`, builds the same 59 features, standardizes them, and computes Gaussian log probabilities for both classes. The result card shows a green "Backend prediction" badge for API results and an amber "In-browser prediction" badge for the fallback.

### Result payload

A successful prediction contains:

- predicted class (`yes`/`no`)
- subscription probability and confidence
- per-class probabilities
- model used and model metadata
- encoded model inputs and per-feature log-odds contributions
- top positive/negative drivers
- success status and ISO generation timestamp, displayed by the result card as the generated time

## Frontend Pages and Features

The configured primary routes are:

| Route | Page | Purpose |
|---|---|---|
| `/` | Landing | Introduces the project. |
| `/dashboard` | Dashboard | Shows dataset KPIs and pipeline status. |
| `/dataset` | Dataset | Shows dataset dimensions, feature definitions, and cleaning summary. |
| `/eda` | EDA & Visualization | Displays the supplied EDA charts and findings. |
| `/evaluation` | Model Evaluation | Shows selected-model metrics, classification details, confusion matrix, and comparison results. |
| `/prediction` | Customer Subscription Prediction | Collects inputs and returns a Gaussian Naive Bayes prediction. |
| `/about` | About | Shows project context, dataset source, and technology stack. |

The routes `/project`, `/preprocessing`, `/models`, and `/models/:modelName` redirect to existing pages rather than providing separate page implementations.

## Project Structure

```text
Bank-Marketing-Campaign-ML/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI app, CORS, model loading lifespan
│   │   ├── config.py               # paths, encoding config, model metadata
│   │   ├── schemas/predict.py      # request/response models (Swagger schemas)
│   │   ├── services/predictor.py   # feature encoding + prediction/analysis
│   │   └── api/routes.py           # POST /api/predict, GET /api/health
│   └── requirements.txt
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── .env.example                # VITE_API_BASE_URL override
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   ├── eda/
│   │   │   ├── age-distribution.png
│   │   │   ├── contact-subscription.png
│   │   │   ├── job-distribution.png
│   │   │   ├── month-subscription.png
│   │   │   ├── poutcome-subscription.png
│   │   │   ├── previous-contacts.png
│   │   │   ├── prior-contact.png
│   │   │   └── target-distribution.png
│   │   └── model/
│   │       ├── logistic-roc.png
│   │       └── model-comparison.png
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── data/projectData.js
│       ├── services/
│       │   ├── datasetService.js
│       │   ├── modelService.js
│       │   └── predictionService.js
│       ├── pages/
│       │   ├── About/About.jsx
│       │   ├── Dashboard/Dashboard.jsx
│       │   ├── Dataset/Dataset.jsx
│       │   ├── EDA/EDA.jsx
│       │   ├── Evaluation/Evaluation.jsx
│       │   ├── Landing/Landing.jsx
│       │   └── Prediction/Prediction.jsx
│       ├── components/
│       │   ├── cards/
│       │   │   ├── KpiCard.jsx
│       │   │   └── PredictionResult.jsx
│       │   ├── charts/ChartCard.jsx
│       │   ├── common/
│       │   │   ├── Pipeline.jsx
│       │   │   └── StatePanel.jsx
│       │   ├── forms/FormField.jsx
│       │   ├── layout/
│       │   │   ├── AppShell.jsx
│       │   │   ├── Navbar.jsx
│       │   │   └── Sidebar.jsx
│       │   └── tables/DataTable.jsx
│       └── styles/
│           ├── components.css
│           ├── global.css
│           ├── layout.css
│           └── variables.css
├── models/
│   ├── naive_bayes_model.pkl
│   └── scaler.pkl
├── notebooks/
│   ├── EDA.ipynb
│   ├── DataPreprocessing.ipynb
│   └── ModelTrainingAndEvaluation.ipynb
├── tests/
│   ├── basic.spec.js               # UI page audits
│   ├── model-parity.spec.js        # browser model vs Python model parity
│   ├── prediction-api.spec.js      # full-stack prediction via the backend
│   └── generate_model_predictions.py
├── package.json                    # Playwright test runner
├── playwright.config.js            # starts frontend + backend web servers
├── .gitignore
└── README.md
```

## Technologies Used

### Machine Learning / Data Science

- Python
- Jupyter Notebook
- Pandas
- NumPy
- Matplotlib
- scikit-learn
- joblib

### Backend

- FastAPI
- uvicorn
- Pydantic
- Swagger UI (`/docs`)

### Frontend

- React
- React DOM
- React Router DOM
- Vite
- Recharts
- Bootstrap
- Lucide React
- CSS

### Development Tools

- npm
- Vite development server and production build
- Oxlint

## How to Run the Project

### Prerequisites

- Node.js and npm.
- Python 3 with `pip` for the backend.
- The repository cloned locally.

### Backend (FastAPI + model)

Create a virtual environment, install the dependencies, and start the server:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows   (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

The API is served at `http://localhost:8000` and Swagger UI at `http://localhost:8000/docs`.

### Frontend

Install dependencies and start the Vite development server:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local development URL in the terminal (`http://localhost:5173` by default).

The frontend calls the backend at `http://localhost:8000` by default. If the backend runs on a different port, create `frontend/.env` from `frontend/.env.example` and set `VITE_API_BASE_URL`; for example:

```bash
VITE_API_BASE_URL=http://localhost:8001
```

If the backend is unreachable, predictions fall back to the in-browser Naive Bayes implementation.

### Build for production

Run from `frontend/`:

```bash
npm run build
```

### Run the tests

From the repository root (starts the frontend and backend servers automatically):

```bash
pip install -r backend/requirements.txt   # once, for the test backend
npx playwright test
```

### Lint

Run from `frontend/`:

```bash
npm run lint
```

These commands are taken from the corresponding `package.json` files.

## Model Artifacts

The `models/` directory contains:

| File | Documented purpose |
|---|---|
| `naive_bayes_model.pkl` | Saved Naive Bayes model artifact. |
| `scaler.pkl` | Saved scaler artifact for numerical feature standardization. |

The backend loads these artifacts directly (`backend/app/services/predictor.py`). The frontend browser fallback uses the JavaScript parameter object in `frontend/src/data/projectData.js`; the frontend feature order, encoding, scaling parameters, and Naive Bayes parameters must remain consistent with the trained model.

## Notebooks

- **`notebooks/EDA.ipynb`** — loads and examines the dataset, checks structure and data quality, and explores customer, campaign, economic, and target distributions.
- **`notebooks/DataPreprocessing.ipynb`** — checks missing and unknown values and duplicates, cleans the data, excludes leakage-prone `duration`, encodes features, scales numerical values, and prepares training/test data.
- **`notebooks/ModelTrainingAndEvaluation.ipynb`** — loads processed train/test data, trains the candidate classifiers, calculates metrics, evaluates confusion matrices and ROC-AUC, compares models, and records the selected model.

## Important Notes

- The raw `bank-additional-full.csv` file is not included in the repository; it is referenced by the notebooks. The model-parity test (`tests/model-parity.spec.js`) regenerates predictions from the saved pickle via `tests/generate_model_predictions.py`, which expects the raw CSV at its original absolute path.
- Prediction runs through the FastAPI backend (`backend/`), which loads the saved pickle artifacts; the frontend falls back to the in-browser implementation in `predictionService.js` only when the API is unreachable.
- `duration` is excluded from model training because the project identifies it as target leakage.
- The repository contains both pickle artifacts and frontend JavaScript parameters; changes to the trained feature representation must be reflected consistently in the frontend, the backend encoding, and the tests.

## Future Improvements

The following are future improvements, not completed features in the current repository:

- Add deployment configuration for the frontend and model-serving layer.
- Add model monitoring and periodic evaluation on new campaign data.
- Add a reproducible dataset download or preparation step for notebook execution.
- Make the model-parity test dataset path configurable instead of depending on the original machine's absolute location.

## Dataset Reference

The project identifies the source as the UCI Machine Learning Repository Bank Marketing dataset and cites:

> S. Moro, P. Cortez and P. Rita. *A Data-Driven Approach to Predict the Success of Bank Telemarketing*. Decision Support Systems (2014).
