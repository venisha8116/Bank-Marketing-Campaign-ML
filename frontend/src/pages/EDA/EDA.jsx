import {
  BarChart3,
  Database,
  Phone,
  CalendarDays,
  History,
} from "lucide-react";

import ChartCard from "../../components/charts/ChartCard";
import {
  targetDistribution,
  jobDistribution,
  contactDistribution,
  monthDistribution,
  poutcomeDistribution,
  edaFindings,
} from "../../data/projectData.js";

function StatList({ items, labelKey, valueKey }) {
  return (
    <div className="table-wrap" style={{ border: "none" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>{labelKey}</th>
            <th>{valueKey}</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item[labelKey]}>
              <td>{item[labelKey]}</td>
              <td>
                {item[valueKey]?.toLocaleString?.() ?? item[valueKey]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EDA() {
  return (
    <div>
      <div className="page-header">
        <h1>EDA &amp; Visualization</h1>
        <p>
          Visual findings reproduced from the supplied EDA notebook.
        </p>
      </div>

      {/* Target Distribution */}
      <div className="grid grid-2 section">
        <ChartCard
          title="Target Variable Distribution"
          description="Exact target counts reported by the EDA notebook."
        >
          <img
            src="/eda/target-distribution.png"
            alt="Target variable distribution from EDA notebook"
            className="notebook-figure"
          />
        </ChartCard>

        <div className="card card-pad">
          <div className="section-title">
            <div>
              <h2>Target Counts</h2>
              <div className="section-subtitle">
                The project dataset is strongly imbalanced.
              </div>
            </div>

            <Database size={20} />
          </div>

          <StatList
            items={targetDistribution.map((item) => ({
              Class: item.label,
              Customers: item.value,
            }))}
            labelKey="Class"
            valueKey="Customers"
          />

          <p className="figure-note">
            No: 36,548 (88.73%) · Yes: 4,640 (11.27%).
          </p>
        </div>
      </div>

      {/* Job Distribution */}
      <div className="grid grid-2 section">
        <ChartCard
          title="Customers by Job"
          description="Real job counts from the EDA notebook."
        >
          <img
            src="/eda/job-distribution.png"
            alt="Job distribution from EDA notebook"
            className="notebook-figure"
          />
        </ChartCard>

        <div className="card card-pad">
          <div className="section-title">
            <div>
              <h2>Job Distribution</h2>
              <div className="section-subtitle">
                Distribution of customers across recorded job categories.
              </div>
            </div>

            <BarChart3 size={20} />
          </div>

          <StatList
            items={jobDistribution.map((item) => ({
              Job: item.job,
              Customers: item.count,
            }))}
            labelKey="Job"
            valueKey="Customers"
          />
        </div>
      </div>

      {/* Contact Method */}
      <div className="grid grid-2 section">
        <ChartCard
          title="Contact Method vs Subscription"
          description="Notebook visualization of subscription distribution by contact method."
        >
          <img
            src="/eda/contact-subscription.png"
            alt="Contact type and subscription distribution"
            className="notebook-figure"
          />
        </ChartCard>

        <div className="card card-pad">
          <div className="section-title">
            <div>
              <h2>Contact Method</h2>
              <div className="section-subtitle">
                Distribution of customers by contact method.
              </div>
            </div>

            <Phone size={20} />
          </div>

          <StatList
            items={contactDistribution.map((item) => ({
              Type: item.type,
              Customers: item.count,
            }))}
            labelKey="Type"
            valueKey="Customers"
          />
        </div>
      </div>

      {/* Campaign Month */}
      <div className="grid grid-2 section">
        <ChartCard
          title="Subscription by Month"
          description="The notebook shows how subscription distribution changes across campaign months."
        >
          <img
            src="/eda/month-subscription.png"
            alt="Month subscription distribution"
            className="notebook-figure"
          />
        </ChartCard>

        <div className="card card-pad">
          <div className="section-title">
            <div>
              <h2>Campaign Month Counts</h2>
              <div className="section-subtitle">
                Distribution of campaign contacts across months.
              </div>
            </div>

            <CalendarDays size={20} />
          </div>

          <StatList
            items={monthDistribution.map((item) => ({
              Month: item.month,
              Customers: item.count,
            }))}
            labelKey="Month"
            valueKey="Customers"
          />
        </div>
      </div>

      {/* Previous Campaign Outcome */}
      <div className="grid grid-2 section">
        <ChartCard
          title="Previous Outcome vs Subscription"
          description="Real notebook visualization for previous campaign outcome."
        >
          <img
            src="/eda/poutcome-subscription.png"
            alt="Previous campaign outcome and subscription"
            className="notebook-figure"
          />
        </ChartCard>

        <div className="card card-pad">
          <div className="section-title">
            <div>
              <h2>Previous Campaign Outcome</h2>
              <div className="section-subtitle">
                Distribution of recorded outcomes from previous campaigns.
              </div>
            </div>

            <History size={20} />
          </div>

          <StatList
            items={poutcomeDistribution.map((item) => ({
              Outcome: item.outcome,
              Customers: item.count,
            }))}
            labelKey="Outcome"
            valueKey="Customers"
          />
        </div>
      </div>

      {/* Verified Findings */}
      <section className="section">
        <div className="card card-pad">
          <h2
            style={{
              fontSize: 16,
              marginBottom: 14,
            }}
          >
            Verified EDA Findings
          </h2>

          <ul
            style={{
              paddingLeft: 20,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {edaFindings.map((finding, index) => (
              <li
                key={index}
                style={{
                  fontSize: 13.5,
                  lineHeight: 1.6,
                }}
              >
                {finding}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}