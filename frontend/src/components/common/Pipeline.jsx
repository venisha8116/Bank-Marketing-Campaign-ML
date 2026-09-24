import { ArrowRight, Check, Database, Filter, BarChart3, Cpu, Gauge, Sparkles } from "lucide-react";

const iconMap = {
  dataset: Database,
  cleaning: Filter,
  preprocessing: Filter,
  eda: BarChart3,
  training: Cpu,
  evaluation: Gauge,
  prediction: Sparkles,
};

export default function Pipeline({ stages }) {
  return (
    <div className="pipeline">
      {stages.map((stage, i) => {
        const Icon = iconMap[stage.key] || Sparkles;
        return (
          <div key={stage.key} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div className={`pipeline-stage ${stage.status === "active" ? "active" : ""}`}>
              <div className="pipeline-stage__icon">
                {stage.status === "complete" ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <div className="pipeline-stage__label">{stage.label}</div>
              <div className="pipeline-stage__detail">{stage.detail}</div>
            </div>
            {i < stages.length - 1 && (
              <div className="pipeline-arrow">
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
