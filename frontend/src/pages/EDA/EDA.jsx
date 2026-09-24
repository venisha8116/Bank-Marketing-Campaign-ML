import { BarChart3, Database, Phone, CalendarDays, History } from "lucide-react";
import ChartCard from "../../components/charts/ChartCard";
import { targetDistribution, jobDistribution, contactDistribution, monthDistribution, poutcomeDistribution, edaFindings } from "../../data/projectData.js";

function StatList({ items, labelKey, valueKey }) {
  return <div className="table-wrap" style={{border:"none"}}><table className="data-table"><thead><tr><th>{labelKey}</th><th>{valueKey}</th></tr></thead><tbody>{items.map(item=><tr key={item[labelKey]}><td>{item[labelKey]}</td><td>{item[valueKey]?.toLocaleString?.() ?? item[valueKey]}</td></tr>)}</tbody></table></div>;
}

export default function EDA() {
  return <div>
    <div className="page-header"><h1>EDA &amp; Visualization</h1><p>Visual findings reproduced from the supplied EDA notebook. The correlation heat map has been removed as requested.</p></div>

    <div className="grid grid-2 section">
      <ChartCard title="Target Variable Distribution" description="Exact target counts reported by the EDA notebook."><img src="/eda/target-distribution.png" alt="Target variable distribution from EDA notebook" className="notebook-figure" /></ChartCard>
      <div className="card card-pad"><div className="section-title"><div><h2>Target Counts</h2><div className="section-subtitle">The project dataset is strongly imbalanced.</div></div><Database size={20}/></div><StatList items={targetDistribution.map(x=>({Class:x.label,Customers:x.value}))} labelKey="Class" valueKey="Customers"/><p className="figure-note">No: 36,548 (88.73%) · Yes: 4,640 (11.27%).</p></div>
    </div>

    <div className="grid grid-2 section">
      <ChartCard title="Customers by Job" description="Real job counts from the EDA notebook."><img src="/eda/job-distribution.png" alt="Job distribution from EDA notebook" className="notebook-figure" /></ChartCard>
      <div className="card card-pad"><div className="section-title"><div><h2>Job Distribution</h2><div className="section-subtitle">The largest groups are administrative, blue-collar and technician roles.</div></div><BarChart3 size={20}/></div><StatList items={jobDistribution.map(x=>({Job:x.job,Customers:x.count}))} labelKey="Job" valueKey="Customers"/></div>
    </div>

    <div className="grid grid-2 section">
      <ChartCard title="Contact Method vs Subscription" description="Notebook visualization of subscription distribution by contact method."><img src="/eda/contact-subscription.png" alt="Contact type and subscription distribution" className="notebook-figure" /></ChartCard>
      <div className="card card-pad"><div className="section-title"><div><h2>Contact Method</h2><div className="section-subtitle">Cellular accounts for 63.47% of records.</div></div><Phone size={20}/></div><StatList items={contactDistribution.map(x=>({Type:x.type,Customers:x.count}))} labelKey="Type" valueKey="Customers"/></div>
    </div>

    <div className="grid grid-2 section">
      <ChartCard title="Subscription by Month" description="The notebook shows how subscription distribution changes across campaign months."><img src="/eda/month-subscription.png" alt="Month subscription distribution" className="notebook-figure" /></ChartCard>
      <div className="card card-pad"><div className="section-title"><div><h2>Campaign Month Counts</h2><div className="section-subtitle">May contains the largest number of contacts; December contains the fewest.</div></div><CalendarDays size={20}/></div><StatList items={monthDistribution.map(x=>({Month:x.month,Customers:x.count}))} labelKey="Month" valueKey="Customers"/></div>
    </div>

    <div className="grid grid-2 section">
      <ChartCard title="Previous Outcome vs Subscription" description="Real notebook visualization for previous campaign outcome."><img src="/eda/poutcome-subscription.png" alt="Previous campaign outcome and subscription" className="notebook-figure" /></ChartCard>
      <div className="card card-pad"><div className="section-title"><div><h2>Previous Campaign Outcome</h2><div className="section-subtitle">Previous successful outcomes are a strong subscription signal.</div></div><History size={20}/></div><StatList items={poutcomeDistribution.map(x=>({Outcome:x.outcome,Customers:x.count}))} labelKey="Outcome" valueKey="Customers"/></div>
    </div>

    <section className="section"><div className="card card-pad"><h2 style={{fontSize:16,marginBottom:14}}>Verified EDA Findings</h2><ul style={{paddingLeft:20,display:"flex",flexDirection:"column",gap:10}}>{edaFindings.map((x,i)=><li key={i} style={{fontSize:13.5,lineHeight:1.6}}>{x}</li>)}</ul></div></section>
  </div>;
}
