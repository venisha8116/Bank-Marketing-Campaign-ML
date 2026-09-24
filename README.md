# Bank Marketing Campaign ML

An academic machine-learning project that predicts whether a bank customer is likely to subscribe to a term deposit. It combines exploratory data analysis, preprocessing, model comparison, saved scikit-learn artifacts, a React/Vite dashboard, and browser-based tests for the prediction interface.

## Overview and Problem Statement

The project treats subscription prediction as a binary classification problem:

- **Target:** `y`
- **Classes:** `no` and `yes`
- **Goal:** predict whether a customer will subscribe to a bank term deposit using customer, campaign, previous-contact, and economic information.

The repository includes notebooks for the data-science workflow and a frontend that displays the project results and performs customer-level Gaussian Naive Bayes predictions in the browser.

## Dataset

The notebooks use the **UCI Machine Learning Repository Bank Marketing dataset**, specifically `bank-additional-full.csv`, loaded with `;` as the separator.

| Item | Verified value |
|---|---:|
| Raw records | 41,188 |
| Raw columns | 21 |
| Raw numerical features | 10 |
| Raw categorical features | 10 |
| Target | `y` |
| Records after removing selected `unknown` rows | 40,787 |
| Records after duplicate removal | 40,775 |
| Final model features | 59 |

The target distribution recorded by the project is 36,548 `no` records (88.734583%) and 4,640 `yes` records (11.265417%). `pdays = 999` represents a customer who was not previously contacted. The raw data contains no `NaN` values, although several categorical fields contain the literal value `unknown`.

The raw CSV is referenced by the notebooks but is **not included in this repository**.

## Workflow

```text
Dataset
  -> EDA
  -> Data cleaning
  -> Categorical encoding and numerical preparation
  -> Train/test split
  -> Model training
  -> Evaluation and comparison
  -> Gaussian Naive Bayes selection
  -> Frontend prediction
```

## Exploratory Data Analysis

`notebooks/EDA.ipynb` examines dataset shape, data types, summary statistics, missing values, categorical values, duplicates, distributions, and target relationships. The frontend presents charts for:

- target distribution
- customers by job
- contact method versus subscription
- subscription by month
- previous campaign outcome versus subscription
- previous-contact information

The documented findings include a strongly imbalanced target, a higher subscription rate for customers with a previous successful campaign outcome, greater use of cellular than telephone contact, and strong movement among `emp.var.rate`, `euribor3m`, and `nr.employed`. The project also records lower average values of those three economic variables for subscribers than for non-subscribers. The frontend intentionally does not display a correlation heat map.

## Preprocessing

`notebooks/DataPreprocessing.ipynb` documents the following steps:

1. Load `bank-additional-full.csv` with a semicolon separator.
2. Inspect shape, types, null values, literal `unknown` values, and duplicates.
3. Remove 330 rows with `unknown` in `job` and 80 rows with `unknown` in `marital`.
4. Remove 12 duplicate rows after that cleaning step.
5. Keep other categorical `unknown` values represented in the project features; no `NaN` imputation is needed.
6. Exclude `duration` before training because it is only known after the call and introduces target leakage.
7. Encode categorical variables and prepare numerical variables, producing 59 model features.
8. Standardize the numerical model features with the saved scaler.
9. Encode the target as `no = 0` and `yes = 1`.

## Models Evaluated

The model-training notebook evaluates:

- Logistic Regression
- Decision Tree
- Random Forest
- AdaBoost
- Gradient Boosting
- K-Nearest Neighbors (KNN)
- Gaussian Naive Bayes

## Evaluation Results

The comparison values used by the frontend are:

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 0.9003 | 0.684 | 0.2144 | 0.3264 | 0.7973 |
| Decision Tree | 0.8401 | 0.3077 | 0.3351 | 0.3208 | 0.6202 |
| Random Forest | 0.8974 | 0.6005 | 0.2666 | 0.3693 | 0.7957 |
| AdaBoost | 0.9001 | 0.7 | 0.198 | 0.3087 | 0.8038 |
| Gradient Boosting | 0.8987 | 0.626 | 0.2514 | 0.3587 | 0.8093 |
| KNN | 0.8743 | 0.4169 | 0.2894 | 0.3417 | 0.6985 |
| Gaussian Naive Bayes | **0.8083** | **0.3201** | **0.6235** | **0.423** | **0.7715** |

The selected model's recorded metrics are:

| Metric | Value |
|---|---:|
| Accuracy | 0.8083 |
| Precision | 0.3201 |
| Recall | 0.6235 |
| F1 | 0.423 |
| ROC-AUC | 0.7715 |

Its confusion matrix is:

|  | Predicted No | Predicted Yes |
|---|---:|---:|
| Actual No | 6,019 | 1,217 |
| Actual Yes | 346 | 573 |

The model was evaluated using 32,620 training rows and 8,155 test rows, with 59 features.

## Selected Model

The final selected model is **Gaussian Naive Bayes** (`sklearn.naive_bayes.GaussianNB`) with `var_smoothing = 1e-09`.

The project documents the selection as recall-oriented: Gaussian Naive Bayes achieved the highest recall among the tested models and the lowest recorded number of false negatives. It was not selected because it had the highest accuracy, precision, or ROC-AUC.

## Prediction System

The prediction page collects required inputs in four groups:

- Customer information
- Campaign information
- Previous campaign information
- Economic context

`frontend/src/services/predictionService.js` then:

1. Builds the 59 features in the saved model's expected order.
2. Encodes categorical values, including `cellular = 1` and `telephone = 0` for `contact`.
3. Standardizes the numerical features using the stored means and scales.
4. Computes Gaussian Naive Bayes log scores and normalized class probabilities.
5. Returns `yes` when the positive-class probability is at least `0.5`; otherwise it returns `no`.

The browser uses `naiveBayesParameters` from `frontend/src/data/projectData.js`. It does not deserialize the pickle files directly. A successful result includes the predicted class, subscription probability, confidence, model name, status, and generation timestamp.

## Frontend

The application is built with React and Vite. Its configured pages are:

| Route | Purpose |
|---|---|
| `/` | Landing page and entry point. |
| `/dashboard` | Dataset KPIs and workflow status. |
| `/dataset` | Dataset dimensions, feature definitions, and cleaning summary. |
| `/eda` | EDA charts and verified findings. |
| `/evaluation` | Selected-model metrics, confusion matrix, classification report, and model comparison. |
| `/prediction` | Customer input form and prediction result. |
| `/about` | Project context, source, and technology stack. |

The legacy routes `/project`, `/preprocessing`, `/models`, and `/models/:modelName` redirect to existing pages. Unknown application routes redirect to the dashboard.

## Model ↔ Frontend Parity Testing

The repository contains Playwright tests and a Python parity-data generator:

- `tests/generate_model_predictions.py` loads the saved Python model and scaler, samples up to 10 deterministic dataset rows, and writes temporary comparison data.
- `tests/model-parity.spec.js` imports the frontend prediction function and compares frontend predictions and probabilities with the Python model. Probabilities must differ by less than `0.00001`.
- `tests/basic.spec.js` audits the main routes, navigation, landing-page navigation, and selected page content.
- `playwright.config.js` starts the Vite development server from `frontend/` and runs tests from the repository root.

Run the Playwright suite from the repository root after installing the root Playwright dependency and the frontend dependencies:

```bash
npm install
cd frontend
npm install
cd ..
npx playwright install
npx playwright test
```

The parity generator currently loads the dataset from its own configured local path. The raw dataset is not committed to the repository, so parity testing requires a local copy and the Python dependencies used by the script (`pandas` and `joblib`, plus the model's scikit-learn environment).

### Dataset environment variable

`BANK_MARKETING_DATASET_PATH` is **not currently read by the committed implementation**. The parity generator presently contains a local dataset path in its Python source. Therefore, setting this variable alone does not configure the current tests. Replacing that hard-coded path with environment-variable handling would be a future improvement; personal local paths are intentionally not documented here.

## Project Structure

```text
Bank-Marketing-Campaign-ML/
├── frontend/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── icons.svg
│   │   ├── eda/*.png
│   │   └── model/*.png
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
│       │   ├── charts/
│       │   ├── common/
│       │   ├── forms/
│       │   ├── layout/
│       │   └── tables/
│       └── styles/
├── models/
│   ├── naive_bayes_model.pkl
│   └── scaler.pkl
├── notebooks/
│   ├── EDA.ipynb
│   ├── DataPreprocessing.ipynb
│   └── ModelTrainingAndEvaluation.ipynb
├── tests/
│   ├── basic.spec.js
│   ├── generate_model_predictions.py
│   └── model-parity.spec.js
├── playwright.config.js
├── package.json
├── .gitignore
└── README.md
```

## Technologies

### Machine Learning and data science

- Python
- Jupyter Notebook
- Pandas
- NumPy
- Matplotlib
- scikit-learn
- joblib

### Frontend

- React
- React DOM
- React Router DOM
- Vite
- Recharts
- Bootstrap
- Lucide React
- CSS

### Testing and development

- Playwright Test
- npm
- Oxlint

## Installation and Run Instructions

### Frontend development server

From `frontend/`:

```bash
npm install
npm run dev
```

### Production build

From `frontend/`:

```bash
npm run build
```

The build command is the exact `build` script defined in `frontend/package.json`. To preview the built application locally:

```bash
npm run preview
```

### Linting

From `frontend/`:

```bash
npm run lint
```

### End-to-end tests

From the repository root:

```bash
npm install
npx playwright install
npx playwright test
```

The Playwright configuration starts the frontend with `npm run dev -- --host 127.0.0.1` from the `frontend/` directory. Parity tests also require the external raw dataset and the Python packages used by `tests/generate_model_predictions.py`.

## Model Artifacts

The repository contains:

- `models/naive_bayes_model.pkl` — serialized Gaussian Naive Bayes model.
- `models/scaler.pkl` — serialized `StandardScaler` used for the numerical model features.

The frontend uses the corresponding parameter representation stored in `frontend/src/data/projectData.js`; the feature order, encoding, scaling values, and model parameters must remain aligned.

## Notebooks

- **`notebooks/EDA.ipynb`** — dataset inspection, summary statistics, data-quality checks, distributions, and relationships with subscription behavior.
- **`notebooks/DataPreprocessing.ipynb`** — unknown-value and duplicate analysis, cleaning, target preparation, categorical encoding, numerical scaling, leakage exclusion, and processed feature preparation.
- **`notebooks/ModelTrainingAndEvaluation.ipynb`** — train/test loading, candidate model training, metric calculation, confusion-matrix and ROC-AUC evaluation, model comparison, and final model selection.

## Limitations

- The raw dataset is not included in the repository.
- The browser prediction path is a frontend reimplementation of the saved model parameters rather than a backend inference service.
- The parity test currently depends on an external local dataset and a hard-coded path in `tests/generate_model_predictions.py`; `BANK_MARKETING_DATASET_PATH` is not yet supported by that script.
- The positive-class threshold is fixed at `0.5` in the frontend prediction service.
- The dataset is strongly imbalanced, and the selected model has relatively low precision despite higher recall.
- The repository does not include production deployment or model-monitoring infrastructure.

## Future Improvements

Possible future work, not current functionality:

- Read `BANK_MARKETING_DATASET_PATH` in the parity-data generator and validate the path before loading the CSV.
- Add a backend model-serving API that loads the pickle artifacts.
- Add automated unit tests for preprocessing, feature ordering, encoding, and threshold behavior.
- Add reproducible Python environment/dependency configuration for notebook and parity execution.
- Add deployment configuration and model monitoring.
- Evaluate threshold tuning and imbalance-aware training using a documented validation procedure.

## Dataset Reference

The project identifies the source as the UCI Machine Learning Repository Bank Marketing dataset and cites:

> S. Moro, P. Cortez and P. Rita. *A Data-Driven Approach to Predict the Success of Bank Telemarketing*. Decision Support Systems (2014).
