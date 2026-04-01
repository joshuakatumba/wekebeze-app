import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import "./AdminDashboard.css";

// Professional SVG Icons
const Icons = {
  Users: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Analytics: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Chat: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Quizzes: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  Centers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a7 7 0 0 1 14 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Engagement: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Profile: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.getAnalytics();
      setAnalytics(response);
    } catch (err) {
      setError("Failed to load analytics data");
      console.error("Analytics error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-dashboard">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-dashboard">
          <div className="error-message">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p className="welcome-msg">
            <span className="profile-icon"><Icons.Profile /></span>
            Welcome back, {user?.full_name || "Admin"}
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card" onClick={() => navigate("/admin/users")}>
            <div className="stat-icon users"><Icons.Users /></div>
            <div className="stat-content">
              <h3>{analytics?.overview?.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon new-users"><Icons.Analytics /></div>
            <div className="stat-content">
              <h3>{analytics?.users?.recentRegistrations || 0}</h3>
              <p>New Users (30d)</p>
            </div>
          </div>

          <div className="stat-card" onClick={() => navigate("/admin/chat-nodes")}>
            <div className="stat-icon chats"><Icons.Chat /></div>
            <div className="stat-content">
              <h3>{analytics?.overview?.chatNodesCount || 0}</h3>
              <p>Chat Nodes</p>
            </div>
          </div>

          <div className="stat-card" onClick={() => navigate("/admin/quizzes")}>
            <div className="stat-icon quizzes"><Icons.Quizzes /></div>
            <div className="stat-content">
              <h3>{analytics?.engagement?.quizCompletions?.total || 0}</h3>
              <p>Quiz Completions</p>
            </div>
          </div>

          <div className="stat-card" onClick={() => navigate("/admin/screening-centers")}>
            <div className="stat-icon centers"><Icons.Centers /></div>
            <div className="stat-content">
              <h3>{analytics?.overview?.screeningCentersCount || 0}</h3>
              <p>Screening Centers</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon engagement"><Icons.Engagement /></div>
            <div className="stat-content">
              <h3>{analytics?.engagement?.chatCompletions || 0}</h3>
              <p>Chat Completions</p>
            </div>
          </div>
        </div>

        <div className="content-management">
          <h2>Quick Actions</h2>
          <div className="management-grid">
            <div
              className="management-card"
              onClick={() => navigate("/admin/chat-nodes")}
            >
              <div className="card-icon"><Icons.Chat /></div>
              <h3>Chat Nodes</h3>
              <p>Create and manage interactive chat flows for cancer awareness</p>
              <button className="btn-primary">Manage Chat Nodes</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/screening-centers")}
            >
              <div className="card-icon"><Icons.Centers /></div>
              <h3>Screening Centers</h3>
              <p>Add and manage cancer screening locations across districts</p>
              <button className="btn-primary">Manage Centers</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/quizzes")}
            >
              <div className="card-icon"><Icons.Quizzes /></div>
              <h3>Quizzes</h3>
              <p>Create quiz questions for cancer awareness assessments</p>
              <button className="btn-primary">Manage Quizzes</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="card-icon"><Icons.Users /></div>
              <h3>User Management</h3>
              <p>View, edit, and manage all registered users</p>
              <button className="btn-primary">Manage Users</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/analytics")}
            >
              <div className="card-icon"><Icons.Engagement /></div>
              <h3>Analytics</h3>
              <p>View engagement, progress, and usage analytics</p>
              <button className="btn-primary">View Analytics</button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
