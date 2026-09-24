import { useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import { pageMeta } from "../../utils/navigation";

export default function Navbar({ onOpenMobile }) {
  const location = useLocation();
  const isModelDetails = location.pathname.startsWith("/models/") && location.pathname !== "/models";
  const meta = isModelDetails
    ? { title: "Model Details", breadcrumb: "Home / Model / Model Details" }
    : pageMeta[location.pathname] || { title: "Bank Marketing AI", breadcrumb: "Home" };

  return (
    <header className="navbar">
      <div className="navbar__left">
        <button className="navbar__menu-btn" onClick={onOpenMobile} aria-label="Open navigation">
          <Menu size={18} />
        </button>
        <div className="navbar__titles">
          <div className="navbar__title">{meta.title}</div>
          <div className="navbar__breadcrumb">{meta.breadcrumb}</div>
        </div>
      </div>

      <div className="navbar__right">
        <div className="navbar__status-group">
          <span className="badge badge-success">
            <span className="badge-dot" />
            Dataset Loaded
          </span>
          <span className="badge badge-success">
            <span className="badge-dot" />
            Model Ready
          </span>
        </div>

        {/* <div className="navbar__profile">
          <div className="navbar__profile-avatar">VA</div>
          <div className="navbar__profile-text">
            <div className="navbar__profile-name">Venisha</div>
            <div className="navbar__profile-role">Academic Project</div>
          </div>
        </div> */}
      </div>
    </header>
  );
}
