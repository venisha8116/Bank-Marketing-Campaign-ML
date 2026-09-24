import { useEffect, useState } from "react";
import { Target, Crosshair, Activity, Percent, Gauge } from "lucide-react";
import KpiCard from "../../components/cards/KpiCard";
import { Skeleton } from "../../components/common/StatePanel";
import { getModelInfo, getModelComparison } from "../../services/modelService";

export default function Evaluation() {
  const [model,setModel]=useState(null);
  const [comparison,setComparison]=useState(null);
  useEffect(()=>{ Promise.all([getModelInfo(),getModelComparison()]).then(([m,c])=>{setModel(m);setComparison(c);}); },[]);
  if (!model) return <div><div className="page-header"><h1>Model Evaluation</h1></div><Skeleton height={420}/></div>;
  const cm=model.confusionMatrix;
  return <div>
    <div className="page-header"><h1>Model Evaluation</h1><p>All final evaluation details for the selected Gaussian Naive Bayes model are kept on this page.</p></div>
    <div className="grid grid-2 section">
      <div className="card card-pad"><h3 style={{fontSize:15.5,marginBottom:14}}>Selected Model</h3>{[['Algorithm',model.algorithm],['Library',model.library],['Problem Type',model.problemType],['Target',model.target],['Features Used',model.featuresUsed],['Training Set',model.trainingSetSize.toLocaleString()],['Test Set',model.testSetSize.toLocaleString()],['var_smoothing',String(model.hyperparameters.var_smoothing)]].map(([a,b])=><div className="info-row" key={a}><span className="info-row__label">{a}</span><span className="info-row__value">{b}</span></div>)}</div>
      <div className="card card-pad"><h3 style={{fontSize:15.5,marginBottom:12}}>Why Naive Bayes was selected</h3><p style={{fontSize:13.5,lineHeight:1.7}}>{model.selectionReason}</p><p style={{fontSize:13.5,lineHeight:1.7,marginTop:12}}>The notebook reports recall as the key consideration because missing an actual subscriber is important for the campaign. The final Naive Bayes model reached 62.35% recall and 346 false negatives.</p></div>
    </div>
    <div className="grid grid-5 section">
      <KpiCard icon={Target} label="Accuracy" value={`${(model.accuracy*100).toFixed(2)}%`}/><KpiCard icon={Crosshair} label="Precision" value={`${(model.precision*100).toFixed(2)}%`}/><KpiCard icon={Activity} label="Recall" value={`${(model.recall*100).toFixed(2)}%`}/><KpiCard icon={Percent} label="F1 Score" value={`${(model.f1Score*100).toFixed(2)}%`}/><KpiCard icon={Gauge} label="ROC-AUC" value={model.aucScore.toFixed(4)}/>
    </div>
    <div className="grid grid-2 section">
      <div className="card card-pad"><h3 style={{fontSize:15.5,marginBottom:16}}>Confusion Matrix</h3><table className="data-table" style={{minWidth:"auto"}}><thead><tr><th></th><th>Predicted No</th><th>Predicted Yes</th></tr></thead><tbody><tr><td style={{fontWeight:700}}>Actual No</td><td style={{background:"var(--success-bg)",fontWeight:700}}>{cm.trueNegative.toLocaleString()}</td><td>{cm.falsePositive.toLocaleString()}</td></tr><tr><td style={{fontWeight:700}}>Actual Yes</td><td>{cm.falseNegative.toLocaleString()}</td><td style={{background:"var(--success-bg)",fontWeight:700}}>{cm.truePositive.toLocaleString()}</td></tr></tbody></table></div>
      <div className="card card-pad"><h3 style={{fontSize:15.5,marginBottom:16}}>Final Classification Report</h3><div className="table-wrap" style={{border:"none"}}><table className="data-table"><thead><tr><th>Class</th><th>Precision</th><th>Recall</th><th>F1</th><th>Support</th></tr></thead><tbody>{model.classificationReport.map(r=><tr key={r.class}><td>{r.class}</td><td>{r.precision.toFixed(2)}</td><td>{r.recall.toFixed(2)}</td><td>{r.f1.toFixed(2)}</td><td>{r.support.toLocaleString()}</td></tr>)}</tbody></table></div></div>
    </div>
    <section className="section"><div className="card card-pad"><h3 style={{fontSize:15.5,marginBottom:12}}>Final Model Comparison</h3><p style={{fontSize:13,color:"var(--text-muted)",marginBottom:14}}>These are the final tuned results recorded in the notebook. The selected model's complete details remain above; this table is only the documented comparison used during selection.</p><div className="table-wrap" style={{border:"none"}}><table className="data-table"><thead><tr><th>Model</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>F1</th><th>ROC-AUC</th></tr></thead><tbody>{comparison?.map(r=><tr key={r.model} style={r.model===model.name?{background:"var(--surface-muted)"}:{}}><td style={{fontWeight:r.model===model.name?700:500}}>{r.model}</td><td>{(r.accuracy*100).toFixed(2)}%</td><td>{(r.precision*100).toFixed(2)}%</td><td>{(r.recall*100).toFixed(2)}%</td><td>{(r.f1*100).toFixed(2)}%</td><td>{r.rocAuc.toFixed(4)}</td></tr>)}</tbody></table></div></div></section>
  </div>;
}
