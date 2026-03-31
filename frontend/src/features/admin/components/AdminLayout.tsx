import React, { useState, useCallback, createContext, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./AdminLayout.css";

// ─── Toast Context ───
interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });
export const useToast = () => useContext(ToastContext);

// ─── Toast Component ───
const ToastContainer = ({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: number) => void;
}) => (
  <div className="toast-container">
    {toasts.map((toast) => (
      <div key={toast.id} className={`toast ${toast.type}`}>
        <span>{toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}</span>
        {toast.message}
        <button className="toast-close" onClick={() => onRemove(toast.id)}>
          ×
        </button>
      </div>
    ))}
  </div>
);

// ─── Navigation Items ───
const navItems = [
  { path: "/admin", label: "Dashboard", icon: "📊", section: "overview", end: true },
  { path: "/admin/analytics", label: "Analytics", icon: "📈", section: "overview" },
  { path: "/admin/users", label: "Users", icon: "👥", section: "management" },
  { path: "/admin/chat-nodes", label: "Chat Nodes", icon: "💬", section: "content" },
  { path: "/admin/screening-centers", label: "Screening Centers", icon: "🏥", section: "content" },
  { path: "/admin/quizzes", label: "Quizzes", icon: "📝", section: "content" },
];

// ─── Admin Layout Component ───
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  // Group nav by section
  const overviewItems = navItems.filter((n) => n.section === "overview");
  const managementItems = navItems.filter((n) => n.section === "management");
  const contentItems = navItems.filter((n) => n.section === "content");

  const renderNavLink = (item: (typeof navItems)[0]) => (
    <NavLink
      key={item.path}
      to={item.path}
      end={item.end}
      className={({ isActive }) => (isActive ? "active" : "")}
      onClick={closeSidebar}
      title={item.label}
    >
      <span className="nav-icon">{item.icon}</span>
      <span className="nav-label">{item.label}</span>
    </NavLink>
  );

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "A";

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="admin-layout">
        {/* Mobile toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? "✕" : "☰"}
        </button>

        {/* Overlay for mobile */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
          onClick={closeSidebar}
        />

        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""} ${desktopCollapsed ? "desktop-collapsed" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">W</div>
            <div className="sidebar-brand">
              <span>Wekebeze</span>
              <span>Admin Panel</span>
            </div>
            <button 
              className="desktop-collapse-btn" 
              onClick={() => setDesktopCollapsed(!desktopCollapsed)}
              aria-label="Toggle desktop sidebar"
            >
              {desktopCollapsed ? "»" : "«"}
            </button>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section-label">Overview</div>
            {overviewItems.map(renderNavLink)}

            <div className="nav-section-label">Management</div>
            {managementItems.map(renderNavLink)}

            <div className="nav-section-label">Content</div>
            {contentItems.map(renderNavLink)}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-user">
              <div className="user-avatar">{userInitial}</div>
              <div className="user-info">
                <span>{user?.name || "Admin"}</span>
                <span>{user?.email || ""}</span>
              </div>
            </div>
            <div className="sidebar-footer-actions">
              <a href="/home" className="sidebar-btn" title="Back to App">
                ← <span className="btn-text">Back to App</span>
              </a>
              <button className="sidebar-btn logout" onClick={handleLogout} title="Logout">
                <span className="nav-icon">⏻</span> <span className="btn-text">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`admin-content ${desktopCollapsed ? "desktop-collapsed" : ""}`}>
          {children}
        </main>

        {/* Toasts */}
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </ToastContext.Provider>
  );
};

export default AdminLayout;
