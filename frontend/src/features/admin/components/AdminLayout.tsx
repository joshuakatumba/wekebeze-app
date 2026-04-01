import React, { useState, useCallback, createContext, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./AdminLayout.css";

// Professional SVG Icons
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Analytics: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Chat: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Centers: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a7 7 0 0 1 14 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Quizzes: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Logout: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  BackArrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  ),
};

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
        <span className="toast-icon">
          {toast.type === "success" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : toast.type === "error" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          )}
        </span>
        {toast.message}
        <button className="toast-close" onClick={() => onRemove(toast.id)}>
          <Icons.Close />
        </button>
      </div>
    ))}
  </div>
);

// ─── Navigation Items ───
const navItems = [
  { path: "/admin", label: "Dashboard", Icon: Icons.Dashboard, section: "overview", end: true },
  { path: "/admin/analytics", label: "Analytics", Icon: Icons.Analytics, section: "overview" },
  { path: "/admin/users", label: "Users", Icon: Icons.Users, section: "management" },
  { path: "/admin/chat-nodes", label: "Chat Mgmt", Icon: Icons.Chat, section: "content" },
  { path: "/admin/screening-centers", label: "Screening Centers", Icon: Icons.Centers, section: "content" },
  { path: "/admin/quizzes", label: "Quizzes", Icon: Icons.Quizzes, section: "content" },
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
      <span className="nav-icon"><item.Icon /></span>
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
          {sidebarOpen ? <Icons.Close /> : <Icons.Menu />}
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
              {desktopCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
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
                <span>{user?.name || "Guest Administrator"}</span>
                <span>{user?.email || "No session active"}</span>
              </div>
            </div>
            <div className="sidebar-footer-actions">
              <a href="/home" className="sidebar-btn" title="Back to App">
                <Icons.BackArrow /> <span className="btn-text">Back to App</span>
              </a>
              <button className="sidebar-btn logout" onClick={handleLogout} title="Logout">
                <span className="nav-icon"><Icons.Logout /></span> <span className="btn-text">Logout</span>
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
