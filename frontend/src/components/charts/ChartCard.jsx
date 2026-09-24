import { Maximize2 } from "lucide-react";

export default function ChartCard({ title, description, children, onExpand, height = 300 }) {
  return (
    <div className="card chart-card">
      <div className="chart-card__header">
        <div>
          <div className="chart-card__title">{title}</div>
          {description && <div className="chart-card__desc">{description}</div>}
        </div>
        {onExpand && (
          <button className="icon-btn" onClick={onExpand} aria-label="Expand chart">
            <Maximize2 size={14} />
          </button>
        )}
      </div>
      <div className="chart-card__body" style={{ height }}>
        {children}
      </div>
    </div>
  );
}
