import { naiveBayesParameters } from "../data/projectData.js";

const categoricalGroups = {
  job: ["admin.", "blue-collar", "entrepreneur", "housemaid", "management", "retired", "self-employed", "services", "student", "technician", "unemployed"],
  marital: ["divorced", "married", "single"],
  education: ["basic.4y", "basic.6y", "basic.9y", "high.school", "illiterate", "professional.course", "university.degree", "unknown"],
  default: ["no", "unknown", "yes"],
  housing: ["no", "unknown", "yes"],
  loan: ["no", "unknown", "yes"],
  month: ["apr", "aug", "dec", "jul", "jun", "mar", "may", "nov", "oct", "sep"],
  day_of_week: ["fri", "mon", "thu", "tue", "wed"],
  poutcome: ["failure", "nonexistent", "success"],
};

const numerical = ["age", "contact", "campaign", "pdays", "previous", "emp.var.rate", "cons.price.idx", "cons.conf.idx", "euribor3m", "nr.employed"];

function buildFeatures(payload) {
  const x = {};
  const featureNames = naiveBayesParameters.features;

  for (const name of featureNames) x[name] = 0;

  for (const name of numerical) {
    if (name === "contact") {
      // contact is categorical in the model; this entry is intentionally handled below.
      continue;
    }
    x[name] = Number(payload[name]);
  }

  // contact is the only categorical predictor without a one-hot prefix in the saved model.
  // The model's second feature is the encoded cellular/telephone value from the notebook.
  x.contact = payload.contact === "cellular" ? 1 : 0;

  for (const [field, values] of Object.entries(categoricalGroups)) {
    const value = payload[field];
    if (value == null) continue;
    const feature = `${field}_${value}`;
    if (feature in x) x[feature] = 1;
  }

  return featureNames.map((name) => x[name]);
}

function standardize(values) {
  const result = [...values];
  const numericFeatureNames = naiveBayesParameters.scalerFeatures;
  for (const name of numericFeatureNames) {
    const modelIndex = naiveBayesParameters.features.indexOf(name);
    const scalerIndex = numericFeatureNames.indexOf(name);
    result[modelIndex] = (result[modelIndex] - naiveBayesParameters.scalerMean[scalerIndex]) / naiveBayesParameters.scalerScale[scalerIndex];
  }
  return result;
}

function gaussianLogProbability(x, mean, variance) {
  const safeVariance = variance;
  return -0.5 * (Math.log(2 * Math.PI * safeVariance) + ((x - mean) ** 2) / safeVariance);
}

function predict(payload) {
  const raw = buildFeatures(payload);
  const x = standardize(raw);
  const logScores = naiveBayesParameters.classes.map((_, classIndex) => {
    let score = Math.log(naiveBayesParameters.classPrior[classIndex]);
    for (let i = 0; i < x.length; i += 1) {
      score += gaussianLogProbability(x[i], naiveBayesParameters.theta[classIndex][i], naiveBayesParameters.var[classIndex][i]);
    }
    return score;
  });

  const maxScore = Math.max(...logScores);
  const expScores = logScores.map((score) => Math.exp(score - maxScore));
  const total = expScores.reduce((sum, value) => sum + value, 0);
  const probabilities = expScores.map((value) => value / total);
  const positiveProbability = probabilities[1];
  const prediction = positiveProbability >= 0.5 ? "yes" : "no";

  return {
    prediction,
    probability: Number(positiveProbability.toFixed(6)),
    confidence: Number(Math.max(probabilities[0], probabilities[1]).toFixed(6)),
    modelUsed: "Gaussian Naive Bayes",
    status: "success",
    generatedAt: new Date().toISOString(),
  };
}

export async function runPrediction(payload) {
  return predict(payload);
}
