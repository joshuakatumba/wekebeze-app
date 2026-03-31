import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import { useToast } from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Button from "../../../components/common/Button";
import "./UserManagement.css";

interface IUser {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  is_active?: boolean;
  is_admin?: boolean;
  created_at: string;
}

const UserManagement = () => {
  const { showToast } = useToast();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getAllUsers();
      setUsers(response.users || []);
    } catch (err) {
      setError("Failed to load users");
      console.error("Users error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusChange = async (userId: string, is_active: boolean) => {
    try {
      await api.updateUserStatus(userId, { is_active });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, is_active } : user
        )
      );
      showToast(`User ${is_active ? 'activated' : 'deactivated'} successfully`, "success");
    } catch (err) {
      console.error("Error updating user status:", err);
      showToast("Failed to update user status", "error");
    }
  };

  const handleUserRoleChange = async (userId: string, is_admin: boolean) => {
    if (
      !window.confirm(
        `Are you sure you want to ${is_admin ? "promote" : "demote"} this user?`
      )
    ) {
      return;
    }

    try {
      await api.updateUserStatus(userId, { is_admin });
      setUsers(
        users.map((user) => (user.id === userId ? { ...user, is_admin } : user))
      );
      showToast(`User ${is_admin ? 'promoted to admin' : 'demoted'} successfully`, "success");
    } catch (err) {
      console.error("Error updating user role:", err);
      showToast("Failed to update user role", "error");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await api.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
      showToast("User deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting user:", err);
      showToast("Failed to delete user", "error");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.full_name && user.full_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && user.is_active) ||
      (filter === "inactive" && !user.is_active) ||
      (filter === "admin" && user.is_admin);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="user-management">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="user-management">
          <div className="error-message">{error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
    <div className="user-management">
      <div className="management-header">
        <h1>User Management</h1>
        <p>Manage user accounts and permissions</p>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({users.length})
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active ({users.filter((u) => u.is_active).length})
          </button>
          <button
            className={`filter-btn ${filter === "inactive" ? "active" : ""}`}
            onClick={() => setFilter("inactive")}
          >
            Inactive ({users.filter((u) => !u.is_active).length})
          </button>
          <button
            className={`filter-btn ${filter === "admin" ? "active" : ""}`}
            onClick={() => setFilter("admin")}
          >
            Admins ({users.filter((u) => u.is_admin).length})
          </button>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(filteredUsers || []).map((user) => (
              <tr key={user.id}>
                <td>{user.full_name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`role-badge ${user.is_admin ? "admin" : "user"}`}
                  >
                    {user.is_admin ? "Admin" : "User"}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      user.is_active ? "active" : "inactive"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      onClick={() =>
                        handleUserStatusChange(user.id, !user.is_active)
                      }
                      variant={user.is_active ? "secondary" : "primary"}
                      size="small"
                    >
                      {user.is_active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      onClick={() =>
                        handleUserRoleChange(user.id, !user.is_admin)
                      }
                      variant={user.is_admin ? "warning" : "success"}
                      size="small"
                    >
                      {user.is_admin ? "Demote" : "Promote"}
                    </Button>
                    {!user.is_admin && (
                      <Button
                        onClick={() => handleDeleteUser(user.id)}
                        variant="danger"
                        size="small"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-users">
            <p>No users found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default UserManagement;
