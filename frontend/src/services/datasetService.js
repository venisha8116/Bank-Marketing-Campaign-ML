import { datasetInfo, featureTable, projectInfo } from "../data/projectData.js";

export function getDatasetSummary() { return Promise.resolve(datasetInfo); }
export function getFeatureTable() { return Promise.resolve(featureTable); }
export function getProjectInfo() { return Promise.resolve(projectInfo); }
