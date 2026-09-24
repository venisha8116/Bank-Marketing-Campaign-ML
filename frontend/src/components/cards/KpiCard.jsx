import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCard({ icon: Icon, label, value, meta, trend }) {
  return (
    <div className="card card-hover kpi-card">
      <div className="kpi-card__icon">
        <Icon size={20} />
      </div>
      <div>
        <div className="kpi-card__label">{label}</div>
        <div className="kpi-card__value">{value}</div>
      </div>
      {meta && (
        <div className={`kpi-card__meta ${trend === "up" ? "positive" : trend === "down" ? "negative" : ""}`}>
          {trend === "up" && <TrendingUp size={13} />}
          {trend === "down" && <TrendingDown size={13} />}
          {meta}
        </div>
      )}
    </div>
  );
}
