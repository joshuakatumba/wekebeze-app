import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import "./AdminDashboard.css";

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
          <p>Welcome back, {user?.full_name || "Admin"} 👋</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card" onClick={() => navigate("/admin/users")}>
            <div className="stat-icon users">👥</div>
            <div className="stat-content">
              <h3>{analytics?.overview?.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon new-users">📊</div>
            <div className="stat-content">
              <h3>{analytics?.users?.recentRegistrations || 0}</h3>
              <p>New Users (30d)</p>
            </div>
          </div>

          <div className="stat-card" onClick={() => navigate("/admin/chat-nodes")}>
            <div className="stat-icon chats">💬</div>
            <div className="stat-content">
              <h3>{analytics?.overview?.chatNodesCount || 0}</h3>
              <p>Chat Nodes</p>
            </div>
          </div>

          <div className="stat-card" onClick={() => navigate("/admin/quizzes")}>
            <div className="stat-icon quizzes">📝</div>
            <div className="stat-content">
              <h3>{analytics?.engagement?.quizCompletions?.total || 0}</h3>
              <p>Quiz Completions</p>
            </div>
          </div>

          <div className="stat-card" onClick={() => navigate("/admin/screening-centers")}>
            <div className="stat-icon centers">🏥</div>
            <div className="stat-content">
              <h3>{analytics?.overview?.screeningCentersCount || 0}</h3>
              <p>Screening Centers</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon engagement">📈</div>
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
              <div className="card-icon">💬</div>
              <h3>Chat Nodes</h3>
              <p>Create and manage interactive chat flows for cancer awareness</p>
              <button className="btn-primary">Manage Chat Nodes</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/screening-centers")}
            >
              <div className="card-icon">🏥</div>
              <h3>Screening Centers</h3>
              <p>Add and manage cancer screening locations across districts</p>
              <button className="btn-primary">Manage Centers</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/quizzes")}
            >
              <div className="card-icon">📝</div>
              <h3>Quizzes</h3>
              <p>Create quiz questions for cancer awareness assessments</p>
              <button className="btn-primary">Manage Quizzes</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/users")}
            >
              <div className="card-icon">👥</div>
              <h3>User Management</h3>
              <p>View, edit, and manage all registered users</p>
              <button className="btn-primary">Manage Users</button>
            </div>

            <div
              className="management-card"
              onClick={() => navigate("/admin/analytics")}
            >
              <div className="card-icon">📈</div>
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
