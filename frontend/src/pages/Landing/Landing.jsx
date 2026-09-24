import { ArrowRight, BarChart3, Database, Gauge, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-glow landing-glow--one" /><div className="landing-glow landing-glow--two" />
      <header className="landing-nav">
        <div className="landing-brand"><div className="landing-brand__icon"><BarChart3 size={19} /></div><div><div className="landing-brand__name">Bank Marketing AI</div><div className="landing-brand__sub">Campaign Prediction Platform</div></div></div>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>Open Dashboard <ArrowRight size={15} /></button>
      </header>
      <main className="landing-hero">
        <div className="landing-copy">
          <div className="landing-eyebrow">Machine Learning Project</div>
          <h1>Understand the data.<br /><span>Evaluate the model.</span><br />Predict smarter.</h1>
          <p>An interactive exploration of the Bank Marketing dataset, exploratory analysis, Gaussian Naive Bayes evaluation, and customer subscription prediction.</p>
          <div className="landing-actions"><button className="btn btn-primary btn-large" onClick={() => navigate("/dashboard")}>Explore the Project <ArrowRight size={17} /></button><button className="btn btn-ghost btn-large" onClick={() => navigate("/dataset")}>View Dataset</button></div>
        </div>
        <div className="landing-panel">
          <div className="landing-panel__top"><div><div className="landing-panel__label">PROJECT SNAPSHOT</div><div className="landing-panel__title">Bank Marketing Campaign Prediction</div></div><span className="landing-live"><span /> Ready</span></div>
          <div className="landing-stat-grid">
            <div><Database size={18} /><strong>40,775</strong><span>Cleaned records</span></div>
            <div><Gauge size={18} /><strong>Naive Bayes</strong><span>Selected model</span></div>
            <div><BarChart3 size={18} /><strong>EDA</strong><span>Exploratory analysis</span></div>
            <div><Sparkles size={18} /><strong>Prediction</strong><span>Customer outcome</span></div>
          </div>
          <div className="landing-flow"><span>Dataset</span><i>→</i><span>EDA</span><i>→</i><span>Model</span><i>→</i><span>Evaluation</span><i>→</i><span>Prediction</span></div>
        </div>
      </main>
      <footer className="landing-footer"><span>Bank Marketing Campaign Prediction System</span><span>Academic Machine Learning Project</span></footer>
    </div>
  );
}
