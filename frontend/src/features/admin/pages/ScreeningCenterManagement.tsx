import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import AdminLayout from "../components/AdminLayout";
import { useToast } from "../components/AdminLayout";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Button from "../../../components/common/Button";
import "./ContentManagement.css";

interface IService {
  name: string;
  price: number;
}

interface ICenter {
  id?: string;
  name: string;
  district: string;
  location: string;
  coordinates: { lat: number | string; lng: number | string };
  services: IService[];
  contact?: string;
}

const ScreeningCenterManagement = () => {
  const { showToast } = useToast();
  const [centers, setCenters] = useState<ICenter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState<ICenter | null>(null);
  const [formData, setFormData] = useState<ICenter>({
    name: "",
    district: "",
    location: "",
    coordinates: { lat: "", lng: "" },
    services: [],
    contact: "",
  });

  const availableServices = [
    "Mammography",
    "Pap Smear",
    "HPV Testing",
    "Cervical Screening",
    "Breast Screening",
    "Ultrasound",
  ];

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const response = await api.getAllScreeningCenters();
      setCenters(response.screeningCenters || []);
    } catch (err) {
      setError("Failed to load screening centers");
      console.error("Screening centers error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    if (field === "coordinates.lat" || field === "coordinates.lng") {
      const coordField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [coordField]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleServicePriceChange = (serviceName: string, price: string) => {
    const parsedPrice = parseFloat(price) || 0;
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.name === serviceName ? { ...s, price: parsedPrice } : s
      ),
    }));
  };

  const handleServiceFreeChange = (serviceName: string, isFree: boolean) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.map((s) =>
        s.name === serviceName
          ? { ...s, price: isFree ? 0 : s.price === 0 ? 0 : s.price }
          : s
      ),
    }));
  };

  const addService = (serviceName: string) => {
    if (serviceName && !formData.services.find((s) => s.name === serviceName)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, { name: serviceName, price: 0 }],
      }));
    }
  };

  const removeService = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.name !== serviceName),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat as string),
          lng: parseFloat(formData.coordinates.lng as string),
        },
      };

      if (editingCenter?.id) {
        await api.updateScreeningCenter(editingCenter.id, submitData);
        showToast("Screening center updated successfully", "success");
      } else {
        await api.createScreeningCenter(submitData);
        showToast("Screening center created successfully", "success");
      }
      fetchCenters();
      setShowForm(false);
      setEditingCenter(null);
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      showToast("Failed to save screening center", "error");
    }
  };

  const handleEdit = (center: ICenter) => {
    setEditingCenter(center);
    setFormData({
      name: center.name,
      district: center.district,
      location: center.location,
      coordinates: {
        lat: center.coordinates.lat.toString(),
        lng: center.coordinates.lng.toString(),
      },
      services: center.services || [],
      contact: center.contact || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Are you sure you want to delete this screening center?")
    )
      return;
    try {
      await api.deleteScreeningCenter(id);
      fetchCenters();
      showToast("Screening center deleted", "success");
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete screening center", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      district: "",
      location: "",
      coordinates: { lat: "", lng: "" },
      services: [],
      contact: "",
    });
  };

  const filteredCenters = centers.filter((center: ICenter) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      center.name?.toLowerCase().includes(q) ||
      center.district?.toLowerCase().includes(q) ||
      center.location?.toLowerCase().includes(q)
    );
  });

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
        <h1>Screening Center Management</h1>
        <p>Manage cancer screening centers and their services</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by name, district, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="filter-select"
            style={{ minWidth: '280px' }}
          />
        </div>
        <Button
          onClick={() => {
            setShowForm(true);
            resetForm();
          }}
          variant="primary"
        >
          Add New Screening Center
        </Button>
      </div>

      {showForm && (
        <div className="form-modal">
          <div className="form-container">
            <h2>
              {editingCenter
                ? "Edit Screening Center"
                : "Add New Screening Center"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Center Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      handleFormChange("district", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Location/Address</label>
                <textarea
                  value={formData.location}
                  onChange={(e) => handleFormChange("location", e.target.value)}
                  required
                  rows={2}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) =>
                      handleFormChange("coordinates.lat", e.target.value)
                    }
                    required
                    min="-90"
                    max="90"
                  />
                </div>
                <div className="form-group">
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lng}
                    onChange={(e) =>
                      handleFormChange("coordinates.lng", e.target.value)
                    }
                    required
                    min="-180"
                    max="180"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Services Offered</label>
                <div className="services-table-container">
                  <table className="services-table">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Price (UGX)</th>
                        <th>Free</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.services.map((service) => (
                        <tr key={service.name}>
                          <td>{service.name}</td>
                          <td>
                            <input
                              type="number"
                              value={service.price}
                              onChange={(e) =>
                                handleServicePriceChange(
                                  service.name,
                                  e.target.value
                                )
                              }
                              min="0"
                              step="1000"
                              disabled={service.price === 0}
                              placeholder="Enter price"
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={service.price === 0}
                              onChange={(e) =>
                                handleServiceFreeChange(
                                  service.name,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              onClick={() => removeService(service.name)}
                              className="remove-service-btn"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="add-service-section">
                    <select id="newServiceSelect">
                      {availableServices
                        .filter(
                          (service) =>
                            !formData.services.find((s) => s.name === service)
                        )
                        .map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        addService(
                          (document.getElementById("newServiceSelect") as HTMLSelectElement).value
                        )
                      }
                      className="add-service-btn"
                      disabled={
                        availableServices.filter(
                          (service) =>
                            !formData.services.find((s) => s.name === service)
                        ).length === 0
                      }
                    >
                      Add Service
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Contact Information (Optional)</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleFormChange("contact", e.target.value)}
                  placeholder="Phone number or email"
                />
              </div>

              <div className="form-actions">
                <Button type="submit" variant="primary">
                  {editingCenter ? "Update" : "Create"}
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCenter(null);
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
              <th>Name</th>
              <th>District</th>
              <th>Location</th>
              <th>Coordinates</th>
              <th>Services</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCenters.map((center) => (
              <tr key={center.id}>
                <td>{center.name}</td>
                <td>{center.district}</td>
                <td className="text-cell">{center.location}</td>
                <td>
                  {(center.coordinates.lat as number).toFixed(4)},{" "}
                  {(center.coordinates.lng as number).toFixed(4)}
                </td>
                <td>
                  <div className="services-list">
                    {center.services?.map((service) => (
                      <span key={service.name} className="service-tag">
                        {service.name} (
                        {service.price === 0 ? "Free" : "UGX " + service.price})
                      </span>
                    )) || "None"}
                  </div>
                </td>
                <td>{center.contact || "N/A"}</td>
                <td>
                  <div className="action-buttons">
                    <Button
                      onClick={() => handleEdit(center)}
                      variant="secondary"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => center.id && handleDelete(center.id)}
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

        {filteredCenters.length === 0 && (
          <div className="no-content">
            <p>{searchQuery ? "No screening centers match your search." : "No screening centers found."}</p>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default ScreeningCenterManagement;
