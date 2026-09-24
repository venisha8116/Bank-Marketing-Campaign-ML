# Bank Marketing Campaign ML

An end-to-end machine learning project for predicting whether a bank customer is likely to subscribe to a term deposit. The repository combines exploratory data analysis, data cleaning and preprocessing, model training and comparison, saved model artifacts, and a React/Vite dashboard with an interactive prediction form.

## Project Overview

The project uses customer, campaign, previous-contact, and economic information to study subscription behavior and perform binary classification for the target variable `y`.

The repository contains:

- Jupyter notebooks for EDA, preprocessing, model training, and evaluation.
- Saved Gaussian Naive Bayes and scaler artifacts in `models/`.
- A React frontend that presents the dataset and analysis and performs customer-level prediction in the browser using stored Naive Bayes parameters.

This is an academic/portfolio implementation. The inspected repository does not contain a backend prediction API or deployment configuration.

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

Prediction is implemented in the frontend and does not call a separate backend service.

1. The user completes fields grouped into customer information, campaign information, previous campaign information, and economic context.
2. `predictionService.js` builds the 59 features expected by the saved model parameters.
3. Categorical values are converted to the frontend model representation. `contact` is encoded as `cellular = 1` and `telephone = 0`.
4. Numerical features are standardized with the stored scaling parameters.
5. Gaussian log probabilities are calculated for both classes using the stored class priors, means, and variances.
6. The positive-class probability is compared with `0.5` to produce `yes` or `no`.

The browser implementation imports `naiveBayesParameters` from `frontend/src/data/projectData.js`; it does not load the pickle files directly. A successful prediction result contains:

- predicted class
- subscription probability
- confidence
- model used
- success status
- ISO generation timestamp, displayed by the result card as the generated time

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
├── frontend/
│   ├── package.json
│   ├── package-lock.json
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
│       │   │   ├── charts/ChartCard.jsx
│       │   │   ├── common/
│       │   │   │   ├── Pipeline.jsx
│       │   │   │   └── StatePanel.jsx
│       │   │   ├── forms/FormField.jsx
│       │   │   ├── layout/
│       │   │   │   ├── AppShell.jsx
│       │   │   │   ├── Navbar.jsx
│       │   │   │   └── Sidebar.jsx
│       │   │   └── tables/DataTable.jsx
│       │   └── styles/
│       │       ├── components.css
│       │       ├── global.css
│       │       ├── layout.css
│       │       └── variables.css
├── models/
│   ├── naive_bayes_model.pkl
│   └── scaler.pkl
├── notebooks/
│   ├── EDA.ipynb
│   ├── DataPreprocessing.ipynb
│   └── ModelTrainingAndEvaluation.ipynb
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
- The repository cloned locally.

The repository does not specify a Node.js version.

### Install dependencies

Run from `frontend/`:

```bash
cd frontend
npm install
```

### Start the development server

Run from `frontend/`:

```bash
npm run dev
```

Vite prints the local development URL in the terminal.

### Build for production

Run from `frontend/`:

```bash
npm run build
```

### Preview the production build

Run from `frontend/`:

```bash
npm run preview
```

### Lint

Run from `frontend/`:

```bash
npm run lint
```

These commands are taken from `frontend/package.json`.

## Model Artifacts

The `models/` directory contains:

| File | Documented purpose |
|---|---|
| `naive_bayes_model.pkl` | Saved Naive Bayes model artifact. |
| `scaler.pkl` | Saved scaler artifact for numerical feature standardization. |

The current browser prediction path uses the JavaScript parameter object in `frontend/src/data/projectData.js` rather than deserializing these pickle files. The frontend feature order, encoding, scaling parameters, and Naive Bayes parameters must remain consistent with the trained model.

## Notebooks

- **`notebooks/EDA.ipynb`** — loads and examines the dataset, checks structure and data quality, and explores customer, campaign, economic, and target distributions.
- **`notebooks/DataPreprocessing.ipynb`** — checks missing and unknown values and duplicates, cleans the data, excludes leakage-prone `duration`, encodes features, scales numerical values, and prepares training/test data.
- **`notebooks/ModelTrainingAndEvaluation.ipynb`** — loads processed train/test data, trains the candidate classifiers, calculates metrics, evaluates confusion matrices and ROC-AUC, compares models, and records the selected model.

## Important Notes

- The raw `bank-additional-full.csv` file is not included in the repository; it is referenced by the notebooks.
- Prediction currently runs through the frontend implementation in `predictionService.js`; no backend inference endpoint is present in the inspected source.
- `duration` is excluded from model training because the project identifies it as target leakage.
- The repository contains both pickle artifacts and frontend JavaScript parameters; changes to the trained feature representation must be reflected consistently in the frontend.

## Future Improvements

The following are future improvements, not completed features in the current repository:

- Add a backend model-serving API that loads the pickle artifacts.
- Add automated tests for feature construction, preprocessing consistency, and prediction outputs.
- Add deployment configuration for the frontend and model-serving layer.
- Add model monitoring and periodic evaluation on new campaign data.
- Add a reproducible dataset download or preparation step for notebook execution.

## Dataset Reference

The project identifies the source as the UCI Machine Learning Repository Bank Marketing dataset and cites:

> S. Moro, P. Cortez and P. Rita. *A Data-Driven Approach to Predict the Success of Bank Telemarketing*. Decision Support Systems (2014).
