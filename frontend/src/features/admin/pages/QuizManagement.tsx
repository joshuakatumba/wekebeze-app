import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import { useToast } from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Button from "../../../components/common/Button";
import "./ContentManagement.css";

interface IQuiz {
  id?: string;
  cancerType: string;
  question: string;
  options: string[];
  answer: number;
}

const QuizManagement = () => {
  const { showToast } = useToast();
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ cancerType: "" });
  const [showForm, setShowForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<IQuiz | null>(null);
  const [formData, setFormData] = useState<IQuiz>({
    cancerType: "breast",
    question: "",
    options: ["", "", "", ""],
    answer: 0,
  });

  useEffect(() => {
    fetchQuizzes();
  }, [filters]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await api.getAllQuizzes(filters);
      setQuizzes(response.quizzes || []);
    } catch (err) {
      setError("Failed to load quizzes");
      console.error("Quizzes error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, ""],
    }));
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        options: newOptions,
        answer: prev.answer >= newOptions.length ? 0 : prev.answer,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingQuiz?.id) {
        await api.updateQuiz(editingQuiz.id, formData);
        showToast("Quiz updated successfully", "success");
      } else {
        await api.createQuiz(formData);
        showToast("Quiz created successfully", "success");
      }
      fetchQuizzes();
      setShowForm(false);
      setEditingQuiz(null);
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Failed to save quiz", "error");
    }
  };

  const handleEdit = (quiz: IQuiz) => {
    setEditingQuiz(quiz);
    setFormData({
      cancerType: quiz.cancerType,
      question: quiz.question,
      options: quiz.options,
      answer: quiz.answer,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this quiz question?"))
      return;
    try {
      await api.deleteQuiz(id);
      fetchQuizzes();
      showToast("Quiz deleted", "success");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete quiz", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      cancerType: "breast",
      question: "",
      options: ["", "", "", ""],
      answer: 0,
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
        <h1>Quiz Management</h1>
        <p>Manage quiz questions for cancer awareness assessments</p>
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
            <option value="prostate">Prostate Cancer</option>
          </select>
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          variant="primary"
        >
          Add New Quiz Question
        </Button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <h2>
              {editingQuiz ? "Edit Quiz Question" : "Add New Quiz Question"}
            </h2>
            <form onSubmit={handleSubmit}>
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
                  <option value="prostate">Prostate Cancer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Question</label>
                <textarea
                  value={formData.question}
                  onChange={(e) => handleFormChange("question", e.target.value)}
                  required
                  rows={3}
                  placeholder="Enter the quiz question..."
                />
              </div>

              <div className="form-group">
                <label>Answer Options</label>
                {formData.options.map((option, index) => (
                  <div key={index} className="option-row">
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={formData.answer === index}
                      onChange={() => handleFormChange("answer", index)}
                      title="Mark as correct answer"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                    {formData.options.length > 2 && (
                      <Button
                        type="button"
                        onClick={() => removeOption(index)}
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
                  onClick={addOption}
                  variant="secondary"
                  size="small"
                >
                  Add Option
                </Button>
              </div>

              <div className="form-group">
                <label>Correct Answer: Option {formData.answer + 1}</label>
                <p className="help-text">
                  Select the radio button next to the correct answer above.
                </p>
              </div>

              <div className="form-actions">
                <Button type="submit" variant="primary">
                  {editingQuiz ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingQuiz(null);
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
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(quizzes || []).map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.cancerType}</td>
                <td className="text-cell">{quiz.question}</td>
                <td>{quiz.options.length}</td>
                <td>{quiz.options[quiz.answer]}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      onClick={() => handleEdit(quiz)}
                      variant="secondary"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => quiz.id && handleDelete(quiz.id)}
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

        {quizzes.length === 0 && (
          <div className="no-content">
            <p>No quiz questions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default QuizManagement;
