import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import "./Analytics.css";

const Analytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

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
        <div className="analytics">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="analytics">
          <div className="error-message">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className="analytics">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Detailed insights into app usage and user behavior</p>

        <div className="time-range-selector">
          <button
            className={`time-btn ${timeRange === "7d" ? "active" : ""}`}
            onClick={() => setTimeRange("7d")}
          >
            Last 7 Days
          </button>
          <button
            className={`time-btn ${timeRange === "30d" ? "active" : ""}`}
            onClick={() => setTimeRange("30d")}
          >
            Last 30 Days
          </button>
          <button
            className={`time-btn ${timeRange === "90d" ? "active" : ""}`}
            onClick={() => setTimeRange("90d")}
          >
            Last 90 Days
          </button>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="chart-card">
          <h3>User Activity Over Time</h3>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: "60%" }}></div>
            <div className="chart-bar" style={{ height: "80%" }}></div>
            <div className="chart-bar" style={{ height: "40%" }}></div>
            <div className="chart-bar" style={{ height: "90%" }}></div>
            <div className="chart-bar" style={{ height: "70%" }}></div>
            <div className="chart-bar" style={{ height: "85%" }}></div>
            <div className="chart-bar" style={{ height: "55%" }}></div>
          </div>
          <p className="chart-note">Daily active users trend</p>
        </div>

        <div className="chart-card">
          <h3>Quiz Completion Rates</h3>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color completed"></span>
              <span>Total Completions ({analytics?.engagement?.quizCompletions?.total || 0})</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Chat Interactions</h3>
          <div className="metric-large">
            <div className="metric-number">
              {analytics?.overview?.chatNodesCount || 0}
            </div>
            <div className="metric-label">Total Chat Nodes</div>
          </div>
          <div className="metric-breakdown">
            <div className="metric-item">
              <span className="metric-value">
                {analytics?.overview?.totalUsers || 0}
              </span>
              <span className="metric-desc">Unique Users</span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Screening Center Metrics</h3>
          <div className="metric-large">
            <div className="metric-number">
              {analytics?.overview?.screeningCentersCount || 0}
            </div>
            <div className="metric-label">Total Screening Centers</div>
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Analytics;
