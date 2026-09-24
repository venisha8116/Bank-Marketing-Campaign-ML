import { useEffect, useState } from "react";
import { Database, Rows3, Columns3, Target, CheckCircle2 } from "lucide-react";
import KpiCard from "../../components/cards/KpiCard";
import Pipeline from "../../components/common/Pipeline";
import { Skeleton } from "../../components/common/StatePanel";
import { getDatasetSummary } from "../../services/datasetService";
import { getPipelineStatus } from "../../services/modelService";

export default function Dashboard() {
  const [dataset, setDataset] = useState(null);
  const [stages, setStages] = useState(null);

  useEffect(() => {
    Promise.all([getDatasetSummary(), getPipelineStatus()]).then(([d, s]) => {
      setDataset(d);
      setStages(s);
    });
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Bank Marketing Campaign Dashboard</h1>
        <p>A compact overview of the real dataset and the completed machine-learning workflow.</p>
      </div>

      <div className="grid grid-4 section">
        {!dataset ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} height={90} radius={16} />) : <>
          <KpiCard icon={Rows3} label="Raw Records" value={dataset.rawRows.toLocaleString()} meta="Original dataset" />
          <KpiCard icon={Database} label="Cleaned Records" value={dataset.cleanedRows.toLocaleString()} meta="After cleaning" />
          <KpiCard icon={Columns3} label="Columns" value={dataset.rawColumns} meta="Including target" />
          <KpiCard icon={Target} label="Target" value="y" meta="Binary classification" />
        </>}
      </div>

      <section className="section">
        <div className="section-title">
          <div><h2>Dataset at a Glance</h2><div className="section-subtitle">Core dataset details retained from the Project Overview.</div></div>
        </div>
        {!dataset ? <Skeleton height={150} radius={16} /> : (
          <div className="grid grid-4">
            <div className="card card-pad"><div className="kpi-card__label">Dataset</div><div className="kpi-card__value" style={{ fontSize: 18 }}>{dataset.name}</div></div>
            <div className="card card-pad"><div className="kpi-card__label">After Cleaning</div><div className="kpi-card__value">{dataset.cleanedRows.toLocaleString()}</div><div className="kpi-card__meta">{dataset.rowsRemovedUnknown + dataset.rowsRemovedDuplicates} rows removed</div></div>
            <div className="card card-pad"><div className="kpi-card__label">Model Features</div><div className="kpi-card__value">{dataset.finalFeatureCount}</div><div className="kpi-card__meta">After encoding and duration exclusion</div></div>
            <div className="card card-pad"><div className="kpi-card__label">Problem Type</div><div className="kpi-card__value" style={{ fontSize: 20 }}>{dataset.problemType}</div><div className="kpi-card__meta">Target: {dataset.targetVariable}</div></div>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-title"><div><h2>ML Pipeline</h2><div className="section-subtitle">From the original dataset to a real customer-level prediction.</div></div></div>
        <div className="card card-pad">{!stages ? <Skeleton height={140} /> : <Pipeline stages={stages} />}</div>
      </section>

      {/* <div className="card card-pad" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="kpi-card__icon" style={{ background: "var(--success-bg)", color: "var(--success)" }}><CheckCircle2 size={20} /></div>
        <div><div style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: 14.5 }}>Project data loaded</div><div style={{ fontSize: 13, color: "var(--text-muted)" }}>All dashboard values are tied to the supplied notebooks and trained model artifacts.</div></div>
      </div> */}
    </div>
  );
}
