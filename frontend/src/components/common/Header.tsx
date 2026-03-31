import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const [adminOpen, setAdminOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActiveRoute = (path) => location.pathname === path;

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
            {user && (
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
                    isActiveRoute("/screening-locator")
                      ? "text-pink-500"
                      : ""
                  }`}
                >
                  Screening Locator
                </button>

                {/* Admin Links */}
                {isAdmin() && (
                  <div className="flex flex-wrap items-center space-x-3 border-l border-gray-300 pl-4 ml-4">
                    <button
                      onClick={() => navigate("/admin")}
                      className={`px-3 py-1 text-sm font-semibold rounded-md hover:bg-pink-50 transition ${
                        isActiveRoute("/admin")
                          ? "bg-pink-50 text-pink-500"
                          : "text-gray-700 hover:text-pink-500"
                      }`}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => navigate("/admin/users")}
                      className={`px-3 py-1 text-sm font-semibold rounded-md hover:bg-pink-50 transition ${
                        isActiveRoute("/admin/users")
                          ? "bg-pink-50 text-pink-500"
                          : "text-gray-700 hover:text-pink-500"
                      }`}
                    >
                      Users
                    </button>
                    <button
                      onClick={() => navigate("/admin/analytics")}
                      className={`px-3 py-1 text-sm font-semibold rounded-md hover:bg-pink-50 transition ${
                        isActiveRoute("/admin/analytics")
                          ? "bg-pink-50 text-pink-500"
                          : "text-gray-700 hover:text-pink-500"
                      }`}
                    >
                      Analytics
                    </button>
                    <button
                      onClick={() => navigate("/admin/chat-nodes")}
                      className={`px-3 py-1 text-sm font-semibold rounded-md hover:bg-pink-50 transition ${
                        isActiveRoute("/admin/chat-nodes")
                          ? "bg-pink-50 text-pink-500"
                          : "text-gray-700 hover:text-pink-500"
                      }`}
                    >
                      Chat Mgmt
                    </button>
                    <button
                      onClick={() => navigate("/admin/screening-centers")}
                      className={`px-3 py-1 text-sm font-semibold rounded-md hover:bg-pink-50 transition ${
                        isActiveRoute("/admin/screening-centers")
                          ? "bg-pink-50 text-pink-500"
                          : "text-gray-700 hover:text-pink-500"
                      }`}
                    >
                      Screening Centers
                    </button>
                  </div>
                )}
              </nav>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 flex items-center">
                  Welcome, {user.name || user.email}
                  {isAdmin() && (
                    <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </span>
                <Button
                  onClick={handleLogout}
                  variant="secondary"
                  size="small"
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={() => navigate("/login")}
                  variant="secondary"
                  size="small"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  variant="primary"
                  size="small"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile menu toggle */}
            {user && (
              <button
                className="md:hidden text-gray-700 hover:text-pink-500"
                onClick={() => setAdminOpen(!adminOpen)}
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {user && adminOpen && (
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

            {/* Admin Links */}
            {isAdmin() && (
              <div className="border-t border-gray-200 pt-2 mt-2 space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Admin Panel
                </div>
                <button
                  onClick={() => navigate("/admin")}
                  className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                    isActiveRoute("/admin") ? "text-pink-500" : ""
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate("/admin/users")}
                  className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                    isActiveRoute("/admin/users") ? "text-pink-500" : ""
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => navigate("/admin/analytics")}
                  className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                    isActiveRoute("/admin/analytics") ? "text-pink-500" : ""
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => navigate("/admin/chat-nodes")}
                  className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                    isActiveRoute("/admin/chat-nodes") ? "text-pink-500" : ""
                  }`}
                >
                  Chat Mgmt
                </button>
                <button
                  onClick={() => navigate("/admin/screening-centers")}
                  className={`block w-full text-left px-2 py-2 text-gray-700 hover:text-pink-500 transition-colors font-medium ${
                    isActiveRoute("/admin/screening-centers")
                      ? "text-pink-500"
                      : ""
                  }`}
                >
                  Screening Centers
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
