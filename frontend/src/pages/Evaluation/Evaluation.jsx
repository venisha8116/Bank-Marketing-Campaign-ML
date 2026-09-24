import { useEffect, useState } from "react";
import {
  Target,
  Crosshair,
  Activity,
  Percent,
  Gauge,
} from "lucide-react";

import KpiCard from "../../components/cards/KpiCard";
import { Skeleton } from "../../components/common/StatePanel";
import {
  getModelInfo,
  getModelComparison,
} from "../../services/modelService";

export default function Evaluation() {
  const [model, setModel] = useState(null);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    Promise.all([getModelInfo(), getModelComparison()]).then(
      ([modelData, comparisonData]) => {
        setModel(modelData);
        setComparison(comparisonData);
      }
    );
  }, []);

  if (!model) {
    return (
      <div>
        <div className="page-header">
          <h1>Model Evaluation</h1>
          <p>
            Evaluation results for the selected Gaussian Naive Bayes model.
          </p>
        </div>

        <Skeleton height={420} />
      </div>
    );
  }

  const confusionMatrix = model.confusionMatrix;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Model Evaluation</h1>
        <p>
          Evaluation results, model comparison, and selection details for the
          trained classification models.
        </p>
      </div>

      {/* Selected Model */}
      <div className="grid grid-2 section">
        <div className="card card-pad">
          <h3
            style={{
              fontSize: 15.5,
              marginBottom: 14,
            }}
          >
            Selected Model
          </h3>

          {[
            ["Algorithm", model.algorithm],
            ["Library", model.library],
            ["Problem Type", model.problemType],
            ["Target", model.target],
            ["Features Used", model.featuresUsed],
            ["Training Set", model.trainingSetSize.toLocaleString()],
            ["Test Set", model.testSetSize.toLocaleString()],
            [
              "var_smoothing",
              String(model.hyperparameters.var_smoothing),
            ],
          ].map(([label, value]) => (
            <div className="info-row" key={label}>
              <span className="info-row__label">{label}</span>
              <span className="info-row__value">{value}</span>
            </div>
          ))}
        </div>

        <div className="card card-pad">
          <h3
            style={{
              fontSize: 15.5,
              marginBottom: 12,
            }}
          >
            Why Naive Bayes was selected
          </h3>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
            }}
          >
            {model.selectionReason}
          </p>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
              marginTop: 12,
            }}
          >
            The notebook reports recall as an important consideration because
            missing an actual subscriber is relevant to the campaign. The final
            Naive Bayes model achieved{" "}
            {(model.recall * 100).toFixed(2)}% recall with{" "}
            {confusionMatrix.falseNegative.toLocaleString()} false negatives.
          </p>
        </div>
      </div>

      {/* Evaluation Metrics */}
      <div className="grid grid-5 section">
        <KpiCard
          icon={Target}
          label="Accuracy"
          value={`${(model.accuracy * 100).toFixed(2)}%`}
        />

        <KpiCard
          icon={Crosshair}
          label="Precision"
          value={`${(model.precision * 100).toFixed(2)}%`}
        />

        <KpiCard
          icon={Activity}
          label="Recall"
          value={`${(model.recall * 100).toFixed(2)}%`}
        />

        <KpiCard
          icon={Percent}
          label="F1 Score"
          value={`${(model.f1Score * 100).toFixed(2)}%`}
        />

        <KpiCard
          icon={Gauge}
          label="ROC-AUC"
          value={model.aucScore.toFixed(4)}
        />
      </div>

      {/* Confusion Matrix + Classification Report */}
      <div className="grid grid-2 section">
        <div className="card card-pad">
          <h3
            style={{
              fontSize: 15.5,
              marginBottom: 16,
            }}
          >
            Confusion Matrix
          </h3>

          <table
            className="data-table"
            style={{
              minWidth: "auto",
            }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Predicted No</th>
                <th>Predicted Yes</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>Actual No</td>

                <td
                  style={{
                    background: "var(--success-bg)",
                    fontWeight: 700,
                  }}
                >
                  {confusionMatrix.trueNegative.toLocaleString()}
                </td>

                <td>
                  {confusionMatrix.falsePositive.toLocaleString()}
                </td>
              </tr>

              <tr>
                <td style={{ fontWeight: 700 }}>Actual Yes</td>

                <td>
                  {confusionMatrix.falseNegative.toLocaleString()}
                </td>

                <td
                  style={{
                    background: "var(--success-bg)",
                    fontWeight: 700,
                  }}
                >
                  {confusionMatrix.truePositive.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card card-pad">
          <h3
            style={{
              fontSize: 15.5,
              marginBottom: 16,
            }}
          >
            Final Classification Report
          </h3>

          <div
            className="table-wrap"
            style={{
              border: "none",
            }}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1</th>
                  <th>Support</th>
                </tr>
              </thead>

              <tbody>
                {model.classificationReport.map((row) => (
                  <tr key={row.class}>
                    <td>{row.class}</td>
                    <td>{row.precision.toFixed(2)}</td>
                    <td>{row.recall.toFixed(2)}</td>
                    <td>{row.f1.toFixed(2)}</td>
                    <td>{row.support.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Model Comparison */}
      <section className="section">
        <div className="card card-pad">
          <h3
            style={{
              fontSize: 15.5,
              marginBottom: 12,
            }}
          >
            Final Model Comparison
          </h3>

          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted)",
              marginBottom: 14,
            }}
          >
            Final results recorded in the notebook for the evaluated
            classification models.
          </p>

          <div
            className="table-wrap"
            style={{
              border: "none",
            }}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Accuracy</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1</th>
                  <th>ROC-AUC</th>
                </tr>
              </thead>

              <tbody>
                {comparison?.map((row) => {
                  const isSelected = row.model === model.name;

                  return (
                    <tr
                      key={row.model}
                      style={
                        isSelected
                          ? {
                              background: "var(--surface-muted)",
                            }
                          : {}
                      }
                    >
                      <td
                        style={{
                          fontWeight: isSelected ? 700 : 500,
                        }}
                      >
                        {row.model}
                      </td>

                      <td>
                        {(row.accuracy * 100).toFixed(2)}%
                      </td>

                      <td>
                        {(row.precision * 100).toFixed(2)}%
                      </td>

                      <td>
                        {(row.recall * 100).toFixed(2)}%
                      </td>

                      <td>
                        {(row.f1 * 100).toFixed(2)}%
                      </td>

                      <td>
                        {row.rocAuc.toFixed(4)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}