import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, LineChart } from "lucide-react";
import { navItems } from "../../utils/navigation";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const navigate = useNavigate();
  return (
    <>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <button className="sidebar__toggle" onClick={onToggleCollapse} aria-label="Toggle sidebar">
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <button
          className="sidebar__brand-button"
          onClick={() => navigate("/")}
        >
          <div className="sidebar__brand">
            {/* logo here */}

            {!collapsed && (
              <div className="sidebar__brand-text">
                <div className="sidebar__brand-name">Bank Marketing AI</div>
                <div className="sidebar__brand-sub">
                  Campaign Prediction Platform
                </div>
              </div>
            )}
          </div>
        </button>

        <nav className="sidebar__nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) => `sidebar__nav-item ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                {!collapsed && <span className="sidebar__nav-label">{item.label}</span>}
                {collapsed && <span className="sidebar__tooltip">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__status">
            <span className="sidebar__status-dot" />
            {!collapsed && (
              <div className="sidebar__status-text">
                <div className="sidebar__status-title">ML Pipeline Active</div>
                <div className="sidebar__status-sub">Model trained &amp; ready</div>
              </div>
            )}
          </div>
        </div>
      </aside>
      <div className={`sidebar-drawer-backdrop ${mobileOpen ? "open" : ""}`} onClick={onCloseMobile} />
    </>
  );
}
