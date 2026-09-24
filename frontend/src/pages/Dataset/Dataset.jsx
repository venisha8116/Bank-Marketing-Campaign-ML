import { useEffect, useState } from "react";
import { Rows3, Columns3, Hash, Type, Target, Trash2 } from "lucide-react";
import KpiCard from "../../components/cards/KpiCard";
import DataTable from "../../components/tables/DataTable";
import { Skeleton } from "../../components/common/StatePanel";
import { getDatasetSummary, getFeatureTable } from "../../services/datasetService";
import { cleaningSummary } from "../../data/projectData.js";

const featureColumns = [
  { key: "feature", label: "Feature" },
  { key: "dataType", label: "Data Type" },
  { key: "description", label: "Description" },
  { key: "role", label: "Role" },
];

export default function Dataset() {
  const [summary, setSummary] = useState(null);
  const [features, setFeatures] = useState(null);

  useEffect(() => {
    Promise.all([getDatasetSummary(), getFeatureTable()]).then(([s, f]) => { setSummary(s); setFeatures(f); });
  }, []);

  return <div>
    <div className="page-header"><h1>Dataset</h1><p>Structure, feature definitions, and the verified cleaning outcome of the Bank Marketing dataset.</p></div>
    <div className="grid grid-4 section">
      {!summary ? Array.from({length:4}).map((_,i)=><Skeleton key={i} height={90} radius={16}/>) : <>
        <KpiCard icon={Rows3} label="Rows" value={summary.cleanedRows.toLocaleString()} meta={`${summary.rawRows.toLocaleString()} raw`} />
        <KpiCard icon={Columns3} label="Columns" value={summary.rawColumns} meta="Including target" />
        <KpiCard icon={Hash} label="Numerical" value={summary.rawNumericalFeatures} meta="Raw features" />
        <KpiCard icon={Type} label="Categorical" value={summary.rawCategoricalFeatures} meta="Raw features" />
      </>}
    </div>

    <section className="section">
      <div className="card card-pad" style={{display:"flex",alignItems:"center",gap:16}}><div className="kpi-card__icon"><Target size={20}/></div><div><div style={{fontWeight:700,color:"var(--primary-dark)",fontSize:14.5}}>Target Variable: y</div><div style={{fontSize:13,color:"var(--text-muted)"}}>no = did not subscribe, yes = subscribed.</div></div></div>
    </section>

    <section className="section">
      <div className="section-title"><div><h2>Verified Data Quality Summary</h2><div className="section-subtitle">Only the cleaning facts that affect the final dataset are shown here.</div></div></div>
      <div className="grid grid-4">
        {cleaningSummary.map(item => <div className="card card-pad" key={item.label}><div className="kpi-card__icon"><Trash2 size={18}/></div><div className="kpi-card__label">{item.label}</div><div className="kpi-card__value" style={{fontSize:24}}>{item.value}</div><div className="kpi-card__meta">{item.detail}</div></div>)}
      </div>
    </section>

    <section className="section">
      <div className="section-title"><div><h2>Feature Table</h2><div className="section-subtitle">Feature definitions used to understand the dataset. Unknown Values and Unique Values are intentionally omitted.</div></div></div>
      {!features ? <Skeleton height={420} radius={16}/> : <DataTable columns={featureColumns} rows={features} />}
    </section>
  </div>;
}
