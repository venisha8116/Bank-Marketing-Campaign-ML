import { selectedModel, modelComparison, pipelineStages } from "../data/projectData.js";

export function getModelInfo() { return Promise.resolve(selectedModel); }
export function getEvaluationMetrics() { return Promise.resolve(selectedModel); }
export function getConfusionMatrix() { return Promise.resolve(selectedModel.confusionMatrix); }
export function getClassificationReport() { return Promise.resolve(selectedModel.classificationReport); }
export function getModelComparison() { return Promise.resolve(modelComparison); }
export function getPipelineStatus() { return Promise.resolve(pipelineStages); }
