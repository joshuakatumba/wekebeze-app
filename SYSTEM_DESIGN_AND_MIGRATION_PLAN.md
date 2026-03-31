# 📄 System Design & Migration Plan: Wekebeze Cervical Cancer Awareness

This document outlines the recommended architecture and migration strategy for the Wekebeze application, pivoting from a traditional MERN stack to a modern, scalable, and geospatial-ready infrastructure powered by **Supabase**.

---

## 🏗️ 1. Core Architecture Strategy

### **Backend Infrastructure: Supabase**
We recommend migrating the backend from a custom Node.js/Express server to **Supabase**. 

**Why Supabase?**
* **Predictable Scaling:** Built on top of AWS, Supabase handles the complexity of scaling compute and storage automatically.
* **PostgreSQL Foundation:** Unlike NoSQL (MongoDB), PostgreSQL is a relational database perfect for structured health data, ensuring referential integrity for users, centers, and quiz results.
* **Instant APIs:** Supabase auto-generates secure REST and GraphQL APIs directly from the database schema, significantly reducing backend development time.
* **Real-time Capabilities:** Built-in support for real-time subscriptions, useful for live chat or dashboard updates.

### **Database Design: Structured Relational Model**
The system will transition to a structured model to manage healthcare facility data effectively.

**Core Table: `centers`**
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Unique identifier (Primary Key) |
| `name` | Text | Name of the health facility |
| `location` | geography(Point, 4326) | Geospatial coordinates (PostGIS) |
| `district` | Text | Region or District |
| `services` | Text[] | Array of services (Screening, Vaccination, etc.) |
| `contact_info` | JSONB | Phone, Email, etc. |
| `operating_hours` | JSONB | Structured hours for each day |

---

## 📍 2. Location-Based Services & Geospatial Intelligence

### **Deterministic Search System**
We are opting for a **deterministic approach** rather than AI-driven recommendations. This ensures reliability and clinical accuracy.

1. **Capture:** Capture user’s GPS coordinates via the browser/mobile Geolocation API.
2. **Query:** Use **PostGIS** within Supabase to perform a spatial query.
3. **Sort:** Sort results by literal proximity (meters/kilometers).
4. **Deliver:** Return the nearest verified facilities instantly.

### **Geospatial Optimization (PostGIS)**
By leveraging PostGIS, the application gains:
* **High-performance indexing** (GIST indexes) for large datasets of screening centers.
* **Advanced Radius Search:** Easily query "centers within 50km".
* **Nearest-Neighbor Logic:** Efficiently finding the "closest 5" without scanning the entire table.

---

## 🔐 3. Authentication & Security

### **Supabase Auth Integration**
The application will migrate from custom JWT/MongoDB auth to **Supabase Auth (GoTrue)**.

**Why this choice?**
* **Security:** Native support for MFA (Multi-Factor Authentication), essential for protecting sensitive clinical data in the Admin panel.
* **Identity Providers:** Easy integration with Google, Apple, or Microsoft for one-click user sign-in.
* **Row-Level Security (RLS):** Policies are defined directly in the database, ensuring that a user can *only* see their own data, and only Admins can modify the `centers` or `chat_nodes` tables.
* **Compliance:** Supabase/PostgreSQL architectures are easily hardened for health data standards (SOC2, etc.).

---

## 🗺️ 4. Frontend & Interaction

### **Mapping & UI**
The frontend (React) will integrate with **Google Maps API** or **Mapbox**.
* **Visual Cues:** Highlight the user's location vs. screening hubs.
* **Directions:** Use the mapping provider's routing API to provide turn-by-turn directions.
* **Filtering:** Direct UI filters for "Open Now", "Has Vaccination", or "By District".

---

## 🚀 5. Migration Roadmap (MERN to Supabase)

### **Phase 1: Database Migration**
* Export existing MongoDB data to JSON/CSV.
* Map MongoDB's flat structure to PostgreSQL's relational schema.
* Import `centers` and `users` into Supabase via the bulk import tool.
* Convert latitude/longitude strings into PostGIS `geography` points.

### **Phase 2: Authentication Cutover**
* Initialize Supabase Client in the React frontend.
* Update `AuthContext` to sync with Supabase session states.
* Implement a "Password Reset" flow for existing users to migrate their credentials securely into the new identity pool.

### **Phase 3: API & Frontend Refactoring**
* Replace custom `authAPI` and backend calls with the `supabase-js` client.
* Implement Row-Level Security (RLS) policies for all tables.
* Deploy the updated React build to **Vercel** or **AWS S3/CloudFront**.

---

## ✅ Summary & Conclusion
This architecture prioritizes **simplicity, reliability, and precision**. By utilizing Supabase and PostgreSQL/PostGIS, we eliminate the fragility of custom server code and the unpredictability of AI, delivering a robust tool that users and health professionals can trust.

**Architecture Summary:**
* **Frontend:** React (JavaScript/TypeScript)
* **Backend/DB:** Supabase (PostgreSQL + PostGIS + Auth)
* **Geolocation:** Native GPS + PostGIS Queries
* **Mapping:** Google Maps / Mapbox
* **Optional:** Firebase Cloud Messaging (for future reminders)
