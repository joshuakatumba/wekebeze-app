import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import { useToast } from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Button from "../../../components/common/Button";
import "./ContentManagement.css";

interface IChatButton {
  text: string;
  next_node_id: string;
}

interface IChatNodeData {
  id: string;
  type: string;
  text: string;
  image_url: string;
  buttons: IChatButton[];
}

interface IChatNode {
  id?: string;
  cancerType: string;
  language: string;
  nodeId: string;
  nodeData: IChatNodeData;
}

const ChatNodeManagement = () => {
  const { showToast } = useToast();
  const [chatNodes, setChatNodes] = useState<IChatNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ cancerType: "", language: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingNode, setEditingNode] = useState<IChatNode | null>(null);
  const [formData, setFormData] = useState<IChatNode>({
    cancerType: "breast",
    language: "en",
    nodeId: "",
    nodeData: {
      id: "",
      type: "question",
      text: "",
      image_url: "",
      buttons: [{ text: "", next_node_id: "" }],
    },
  });

  useEffect(() => {
    fetchChatNodes();
  }, [filters]);

  const fetchChatNodes = async () => {
    try {
      setLoading(true);
      const response = await api.getAllChatNodes(filters);
      setChatNodes(response.chatNodes || []);
    } catch (err) {
      setError("Failed to load chat nodes");
      console.error("Chat nodes error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormChange = (field: string, value: any) => {
    if (field === "buttons") {
      setFormData((prev) => ({
        ...prev,
        nodeData: { ...prev.nodeData, buttons: value },
      }));
    } else if (field.startsWith("nodeData.")) {
      const nodeField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nodeData: { ...prev.nodeData, [nodeField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field as keyof IChatNode]: value }));
    }
  };

  const addButton = () => {
    setFormData((prev) => ({
      ...prev,
      nodeData: {
        ...prev.nodeData,
        buttons: [...prev.nodeData.buttons, { text: "", next_node_id: "" }],
      },
    }));
  };

  const removeButton = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      nodeData: {
        ...prev.nodeData,
        buttons: prev.nodeData.buttons.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Transform for Supabase schema
      const submitData = {
        cancer_type: formData.cancerType,
        language: formData.language,
        node_id: formData.nodeId,
        node_data: formData.nodeData
      };

      if (editingNode?.id) {
        await api.updateChatNode(editingNode.id, submitData);
        showToast("Chat node updated successfully", "success");
      } else {
        await api.createChatNode(submitData);
        showToast("Chat node created successfully", "success");
      }
      fetchChatNodes();
      setShowForm(false);
      setEditingNode(null);
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Failed to save chat node", "error");
    }
  };

  const handleEdit = (node: IChatNode) => {
    setEditingNode(node);
    setFormData({
      cancerType: node.cancerType,
      language: node.language,
      nodeId: node.nodeId,
      nodeData: {
        id: node.nodeData.id,
        type: node.nodeData.type,
        text: node.nodeData.text,
        image_url: node.nodeData.image_url || "",
        buttons: node.nodeData.buttons || [{ text: "", next_node_id: "" }],
      },
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this chat node?"))
      return;
    try {
      await api.deleteChatNode(id);
      fetchChatNodes();
      showToast("Chat node deleted", "success");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete chat node", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      cancerType: "breast",
      language: "en",
      nodeId: "",
      nodeData: {
        id: "",
        type: "question",
        text: "",
        image_url: "",
        buttons: [{ text: "", next_node_id: "" }],
      },
    });
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="content-management">
          <LoadingSpinner />
        </div>
      </AdminLayout>
    );
  if (error)
    return (
      <AdminLayout>
        <div className="content-management">
          <div className="error-message">{error}</div>
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
    <div className="content-management">
      <div className="management-header">
        <h1>Chat Node Management</h1>
        <p>Manage chat conversation nodes for cancer awareness</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <select
            value={filters.cancerType}
            onChange={(e) => handleFilterChange("cancerType", e.target.value)}
            className="filter-select"
          >
            <option value="">All Cancer Types</option>
            <option value="breast">Breast Cancer</option>
            <option value="cervical">Cervical Cancer</option>
          </select>
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange("language", e.target.value)}
            className="filter-select"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="lg">Luganda</option>
          </select>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          variant="primary"
        >
          Add New Chat Node
        </Button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <h2>{editingNode ? "Edit Chat Node" : "Add New Chat Node"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Cancer Type</label>
                  <select
                    value={formData.cancerType}
                    onChange={(e) =>
                      handleFormChange("cancerType", e.target.value)
                    }
                    required
                  >
                    <option value="breast">Breast Cancer</option>
                    <option value="cervical">Cervical Cancer</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) =>
                      handleFormChange("language", e.target.value)
                    }
                    required
                  >
                    <option value="en">English</option>
                    <option value="lg">Luganda</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Node ID</label>
                  <input
                    type="text"
                    value={formData.nodeId}
                    onChange={(e) => handleFormChange("nodeId", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Node Data ID</label>
                  <input
                    type="text"
                    value={formData.nodeData.id}
                    onChange={(e) =>
                      handleFormChange("nodeData.id", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Node Type</label>
                <select
                  value={formData.nodeData.type}
                  onChange={(e) =>
                    handleFormChange("nodeData.type", e.target.value)
                  }
                  required
                >
                  <option value="question">Question</option>
                  <option value="answer">Answer</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>

              <div className="form-group">
                <label>Text Content</label>
                <textarea
                  value={formData.nodeData.text}
                  onChange={(e) =>
                    handleFormChange("nodeData.text", e.target.value)
                  }
                  required
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.nodeData.image_url}
                  onChange={(e) =>
                    handleFormChange("nodeData.image_url", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Buttons</label>
                {formData.nodeData.buttons.map((button, index) => (
                  <div key={index} className="button-row">
                    <input
                      type="text"
                      placeholder="Button text"
                      value={button.text}
                      onChange={(e) => {
                        const newButtons = [...formData.nodeData.buttons];
                        newButtons[index].text = e.target.value;
                        handleFormChange("buttons", newButtons);
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Next node ID"
                      value={button.next_node_id}
                      onChange={(e) => {
                        const newButtons = [...formData.nodeData.buttons];
                        newButtons[index].next_node_id = e.target.value;
                        handleFormChange("buttons", newButtons);
                      }}
                      required
                    />
                    {formData.nodeData.buttons.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeButton(index)}
                        variant="danger"
                        size="small"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addButton}
                  variant="secondary"
                  size="small"
                >
                  Add Button
                </Button>
              </div>

              <div className="form-actions">
                <Button type="submit" variant="primary">
                  {editingNode ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingNode(null);
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="content-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>Cancer Type</th>
              <th>Language</th>
              <th>Node ID</th>
              <th>Type</th>
              <th>Text</th>
              <th>Buttons</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(chatNodes || []).map((node) => (
              <tr key={node.id}>
                <td>{node.cancerType}</td>
                <td>{node.language}</td>
                <td>{node.nodeId}</td>
                <td>{node.nodeData.type}</td>
                <td className="text-cell">{node.nodeData.text}</td>
                <td>{node.nodeData.buttons?.length || 0}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      onClick={() => handleEdit(node)}
                      variant="secondary"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => node.id && handleDelete(node.id)}
                      variant="danger"
                      size="small"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {chatNodes.length === 0 && (
          <div className="no-content">
            <p>No chat nodes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default ChatNodeManagement;
