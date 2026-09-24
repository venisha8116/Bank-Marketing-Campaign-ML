import { GraduationCap, Database, Workflow, Code2 } from "lucide-react";
import { projectInfo } from "../../data/projectData.js";

export default function About() {
  return <div>
    <div className="page-header"><h1>About This Project</h1><p>Project context and methodology without repeating dataset, EDA, or final model results.</p></div>
    <div className="card card-pad section" style={{display:"flex",alignItems:"center",gap:16}}><div className="kpi-card__icon"><GraduationCap size={22}/></div><div><div style={{fontWeight:700,color:"var(--primary-dark)",fontSize:15}}>{projectInfo.title}</div><span className="badge badge-accent" style={{marginTop:6}}>Academic Machine Learning Project</span></div></div>
    <div className="grid grid-2 section"><div className="card card-pad"><h3>Problem Statement</h3><p style={{fontSize:13.5,lineHeight:1.7}}>{projectInfo.problemStatement}</p></div><div className="card card-pad"><h3>Objective</h3><p style={{fontSize:13.5,lineHeight:1.7}}>{projectInfo.objective}</p></div></div>
    <div className="grid grid-2 section"><div className="card card-pad"><h3><Database size={17}/> Dataset Source</h3><p style={{fontSize:13.5,lineHeight:1.7}}>{projectInfo.datasetSource}</p><p style={{fontSize:12.5,color:"var(--text-muted)"}}>{projectInfo.citation}</p></div><div className="card card-pad"><h3><Workflow size={17}/> Workflow</h3><div className="tag-list">{projectInfo.workflow.map((x,i)=><span className="tag" key={x}>{i+1}. {x}</span>)}</div></div></div>
    <div className="card card-pad section"><h3><Code2 size={17}/> Technology Stack</h3><div className="tag-list">{projectInfo.techStack.map(x=><span className="tag" key={x}>{x}</span>)}</div></div>
  </div>;
}
