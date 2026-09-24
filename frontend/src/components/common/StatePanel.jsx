import { AlertTriangle, Inbox, WifiOff } from "lucide-react";

export function ErrorState({ title = "Something went wrong", message = "We couldn't load this data. Please try again.", onRetry }) {
  return (
    <div className="state-panel">
      <div className="state-panel__icon">
        <AlertTriangle size={24} />
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry} style={{ marginTop: 8 }}>
          Try Again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", message = "There is no data available for this view." }) {
  return (
    <div className="state-panel">
      <div className="state-panel__icon">
        <Inbox size={24} />
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}

export function UnavailableState({ title = "Model Unavailable", message = "The prediction service is temporarily unavailable. Please try again shortly." }) {
  return (
    <div className="state-panel">
      <div className="state-panel__icon">
        <WifiOff size={24} />
      </div>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}

export function Skeleton({ width = "100%", height = 16, radius = 6, style = {} }) {
  return <div className="skeleton" style={{ width, height, borderRadius: radius, ...style }} />;
}
