import { LayoutDashboard, Database, BarChart3, Gauge, Sparkles, Info } from "lucide-react";

export const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/prediction", label: "Prediction", icon: Sparkles },
  { path: "/dataset", label: "Dataset", icon: Database },
  { path: "/eda", label: "EDA & Visualization", icon: BarChart3 },
  { path: "/evaluation", label: "Model Evaluation", icon: Gauge },
  { path: "/about", label: "About Project", icon: Info },
];

export const pageMeta = {
  "/dashboard": { title: "Dashboard", breadcrumb: "Home / Dashboard" },
  "/prediction": { title: "Prediction", breadcrumb: "Home / Prediction" },
  "/dataset": { title: "Dataset", breadcrumb: "Home / Dataset" },
  "/eda": { title: "EDA & Visualization", breadcrumb: "Home / EDA & Visualization" },
  "/evaluation": { title: "Model Evaluation", breadcrumb: "Home / Model Evaluation" },
  "/about": { title: "About Project", breadcrumb: "Home / About Project" },
};
