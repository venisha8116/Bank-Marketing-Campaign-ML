import { CheckCircle2, XCircle, Clock, Cpu, Server, Monitor } from "lucide-react";

export default function PredictionResult({ result }) {
  const isPositive = result.prediction === "yes";
  const probabilityPct = (result.probability * 100).toFixed(1);
  const confidencePct = (result.confidence * 100).toFixed(1);
  const time = new Date(result.generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const viaApi = result.source === "api";

  return (
    <div className={`result-card ${isPositive ? "positive" : "negative"}`}>
      <div className="result-card__icon">
        {isPositive ? <CheckCircle2 size={30} /> : <XCircle size={30} />}
      </div>
      <div className="result-card__label">Customer Subscription Prediction</div>
      <div className="result-card__outcome">
        {isPositive ? "Likely to Subscribe" : "Unlikely to Subscribe"}
      </div>
      <span className={`badge ${isPositive ? "badge-accent" : "badge-neutral"}`}>
        <span className="badge-dot" /> Target label: {result.prediction}
      </span>

      <div className="result-meta-row">
        <div className="result-meta-item">
          <div className="result-meta-item__value">{probabilityPct}%</div>
          <div className="result-meta-item__label">Probability</div>
        </div>
        <div className="result-meta-item">
          <div className="result-meta-item__value">{confidencePct}%</div>
          <div className="result-meta-item__label">Confidence</div>
        </div>
        <div className="result-meta-item">
          <div className="result-meta-item__value" style={{ fontSize: 13.5 }}>{result.modelUsed}</div>
          <div className="result-meta-item__label"><Cpu size={10} style={{ verticalAlign: -1 }} /> Model</div>
        </div>
        <div className="result-meta-item">
          <div className="result-meta-item__value" style={{ fontSize: 13.5 }}>{time}</div>
          <div className="result-meta-item__label"><Clock size={10} style={{ verticalAlign: -1 }} /> Generated</div>
        </div>
      </div>

      <div className={`result-source ${viaApi ? "result-source--api" : "result-source--browser"}`}>
        {viaApi ? <Server size={13} /> : <Monitor size={13} />}
        {viaApi
          ? "Backend prediction · FastAPI + trained model"
          : "In-browser prediction · Backend API unavailable"}
      </div>
    </div>
  );
}
