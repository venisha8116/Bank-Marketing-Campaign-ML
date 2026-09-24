import {
  GraduationCap,
  Database,
  Workflow,
  Code2,
} from "lucide-react";

import { projectInfo } from "../../data/projectData.js";

export default function About() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>About This Project</h1>
        <p>
          Project context, objective, methodology, and technology stack.
        </p>
      </div>

      {/* Project Identity */}
      <div
        className="card card-pad section"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div className="kpi-card__icon">
          <GraduationCap size={22} />
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              color: "var(--primary-dark)",
              fontSize: 15,
            }}
          >
            {projectInfo.title}
          </div>

          <span
            className="badge badge-accent"
            style={{ marginTop: 6 }}
          >
            Academic Machine Learning Project
          </span>
        </div>
      </div>

      {/* Problem and Objective */}
      <div className="grid grid-2 section">
        <div className="card card-pad">
          <h3>Problem Statement</h3>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
            }}
          >
            {projectInfo.problemStatement}
          </p>
        </div>

        <div className="card card-pad">
          <h3>Objective</h3>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
            }}
          >
            {projectInfo.objective}
          </p>
        </div>
      </div>

      {/* Dataset Source and Workflow */}
      <div className="grid grid-2 section">
        <div className="card card-pad">
          <h3>
            <Database size={17} /> Dataset Source
          </h3>

          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.7,
            }}
          >
            {projectInfo.datasetSource}
          </p>

          <p
            style={{
              fontSize: 12.5,
              color: "var(--text-muted)",
            }}
          >
            {projectInfo.citation}
          </p>
        </div>

        <div className="card card-pad">
          <h3>
            <Workflow size={17} /> Workflow
          </h3>

          <div className="tag-list">
            {projectInfo.workflow.map((step, index) => (
              <span className="tag" key={step}>
                {index + 1}. {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="card card-pad section">
        <h3>
          <Code2 size={17} /> Technology Stack
        </h3>

        <div className="tag-list">
          {projectInfo.techStack.map((technology) => (
            <span className="tag" key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}