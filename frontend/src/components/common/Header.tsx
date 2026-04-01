import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";

// Professional SVG Icons
const Icons = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Locator: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a7 7 0 0 1 14 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Logout: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Login: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
};

interface ProfileDropdownProps {
  user: any;
  isAdmin: () => boolean;
  isAdminRoute: boolean;
  onLogout: () => void;
  navigate: (path: string) => void;
}

const ProfileDropdown = ({ user, isAdmin, isAdminRoute, onLogout, navigate }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "A";
  const displayName = user?.name || (isAdminRoute ? "Guest Administrator" : "User");
  const displayEmail = user?.email || (user ? "" : "No session active");
  const displayRole = isAdmin() ? "Administrator" : user ? "Member" : "Guest Admin";

  const gradient = isAdminRoute 
    ? "linear-gradient(135deg, #ec4899, #8b5cf6)" 
    : "linear-gradient(135deg, #ec4899, #f97316)";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none group"
        title="Profile menu"
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: gradient,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            flexShrink: 0,
            boxShadow: "0 0 0 2px #fff, 0 0 0 4px #ec4899",
            transition: "all 0.2s",
          }}
          className="group-hover:scale-105"
        >
          {userInitial}
        </div>
        <svg
          style={{
            width: 14,
            height: 14,
            color: "#6b7280",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 10px)",
            width: 240,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            border: "1px solid #f3f4f6",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          {/* Profile header */}
          <div
            style={{
              background: gradient,
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
                flexShrink: 0,
                border: "2px solid rgba(255,255,255,0.5)",
              }}
            >
              {userInitial}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {displayName}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {displayEmail}
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 4,
                  padding: "2px 8px",
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 20,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {displayRole}
              </span>
            </div>
          </div>

          {/* Menu items */}
          <div style={{ padding: "8px 0" }}>
            <button
              onClick={() => { navigate("/home"); setIsOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#374151", textAlign: "left" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fdf2f8")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              <Icons.Home /> Home
            </button>
            <button
              onClick={() => { navigate("/screening-locator"); setIsOpen(false); }}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#374151", textAlign: "left" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fdf2f8")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              <Icons.Locator /> Screening Locator
            </button>
            {isAdmin() && (
              <button
                onClick={() => { navigate("/admin"); setIsOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#374151", textAlign: "left" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fdf2f8")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <Icons.Dashboard /> Admin Panel
              </button>
            )}

            {/* Divider */}
            <div style={{ borderTop: "1px solid #f3f4f6", margin: "8px 0" }} />

            {user ? (
              <button
                onClick={() => { onLogout(); setIsOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#ef4444", textAlign: "left" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <Icons.Logout /> Logout
              </button>
            ) : (
              <button
                onClick={() => { navigate("/login"); setIsOpen(false); }}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#ec4899", textAlign: "left" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fdf2f8")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                <Icons.Login /> Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [adminOpen, setAdminOpen] = useState(false);

  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/")}
              className="text-xl font-bold text-pink-500 hover:text-pink-600 transition-colors"
            >
              Wekebeze
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/home")}
                className={`text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                  isActiveRoute("/home") ? "text-pink-500" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigate("/screening-locator")}
                className={`text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                  isActiveRoute("/screening-locator") ? "text-pink-500" : ""
                }`}
              >
                Screening Locator
              </button>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user || isAdminRoute ? (
              <ProfileDropdown 
                user={user} 
                isAdmin={isAdmin} 
                isAdminRoute={isAdminRoute} 
                onLogout={handleLogout} 
                navigate={navigate} 
              />
            ) : (
              <div className="flex space-x-2">
                <Button onClick={() => navigate("/login")} variant="secondary" size="small">
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")} variant="primary" size="small">
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-pink-500"
              onClick={() => setAdminOpen(!adminOpen)}
            >
              <Icons.Menu />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {adminOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 space-y-2 px-2">
            <button
              onClick={() => navigate("/home")}
              className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                isActiveRoute("/home") ? "text-pink-500" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate("/screening-locator")}
              className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                isActiveRoute("/screening-locator") ? "text-pink-500" : ""
              }`}
            >
              Screening Locator
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
