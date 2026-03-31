# Wekebeze Cancer Awareness: Application Architecture & UI Guide

This document provides a comprehensive overview of the **Wekebeze** platform. It is designed to guide frontend developers in understanding the application's aesthetics, functional modules, and core user workflows.

## 1. Visual Identity & Appearance

The platform is designed to be **warm, professional, and accessible**, emphasizing trust and ease of use for health education.

### Brand Aesthetics
- **Color Palette**:
    - **Primary (`#6366f1`)**: A calming indigo/blue used for navigation, headers, and primary actions.
    - **Accent/Rose (`#f43f5e`)**: A vibrant rose/pink used for highlights, calls to action (CTAs), and awareness-specific branding (e.g., Breast Cancer awareness).
    - **Background (`#f8fafc`)**: A soft slate grey/white to reduce eye strain and provide contrast.
    - **Cards (`#ffffff`)**: Clean, white elevated containers for content.
- **Typography**: Heavily utilizes **Font Serif** for headings (Serif fonts convey authority and trust in health contexts) and standard **Sans** for body text.
- **Design Patterns**: 
    - **Card-Based Layouts**: Information is chunked into logical "cards" with `soft-md` shadows (`rgba(15,23,42,0.06)`).
    - **Interactive Micro-animations**: Subtle transitions on button hovers and page entries.
    - **Responsive Design**: Focused on mobile-first accessibility while Scaling gracefully for desktop (Max-width containers at `5xl` or `1024px`).

---

## 2. Platform Functionalities

The application is a **content-driven educational hub** integrated with **geospatial discovery tools**.

### Core Modules
1.  **Awareness Hub**: The central repository for cancer education (Breast & Cervical). Content is bifurcated by language (English/Luganda).
2.  **AI/Interactive Chat**: A tree-based conversational agent that guides users through specific symptoms, prevention, and diagnostic information based on `chat_nodes`.
3.  **Self-Assessment (Quiz)**: Interactive quizzes to reinforce learning and track user progress.
4.  **Screening Locator**: A geographical search tool using **Leaflet** and **PostGIS** to find clinical centers based on proximity and specific services (e.g., "Biopsy," "Cervical Screening").
5.  **Admin Suite**: A full-featured management panel for content (nodes/quizzes) and users.

---

## 3. Core User Workflow

### Flow A: Onboarding & Discovery
1.  **Welcome**: Users land on the `WelcomeScreen` to understand the mission.
2.  **Auth (Supabase)**: Users sign up/log in. Profiles are automatically created in the `profiles` table via a database trigger.
3.  **Hub Selection**: User selects the type of cancer they want to learn about (Breast vs Cervical).
4.  **Language Preference**: User selects their preferred language (English vs Luganda).

### Flow B: Interactive Learning (The Chat)
1.  **Node Loading**: The app fetches `chat_nodes` from Supabase filtered by `cancer_type` and `language`.
2.  **Conversational Path**: Users interact with buttons (options) within the chat. Each button choice triggers a transition to a specific `next` node.
3.  **State Persistence**: User progress is tracked in `user_chat_history` via the `api.ts` wrapper.

### Flow C: Finding Help (Screening)
1.  **Locator Access**: User lands on the `ScreeningLocator`.
2.  **Search**: Users can search by **District** or use **Geolocation** (Browser GPS).
3.  **Mapping**: Results are rendered on an interactive map (`react-leaflet`) with custom markers.
4.  **Details**: Clicking a center shows available services and contact info.

---

## 4. Technical Architecture (Actions & Backend)

The "Backend" is a serverless **Supabase** instance. All frontend actions are mediated via `src/services/api.ts`.

### Logic & Data Handling
- **Database (Supabase/PostgreSQL)**:
    - **PostGIS**: Used for geographical distance calculations (`rpc: get_nearby_centers`).
    - **JSONB**: Chat flows are stored as structured JSON in the `node_data` column.
- **API (Action Mappings)**:
    - `authAPI`: Handles signing in and profile fetching.
    - `chatAPI`: Fetches conversational sequences.
    - `screeningAPI`: Fetches centers based on filters or coordinates.
    - `adminAPI`: Provides full CRUD (Create, Read, Update, Delete) for all content tables.
- **Vite/React**: The frontend is built for performance with Vite. Large images and assets are kept in the root `assets` and `public` folders.

---

## 5. Summary for Developers

When building new features:
1.  **Check the Schema**: Ensure your feature maps to an existing table in `supabase_schema.sql` or propose a migration.
2.  **Add to API**: Define your interaction in `api.ts` so it can be reused across pages.
3.  **Follow the Folder Pattern**: 
    - `src/features/[featureName]/pages/`: For route components.
    - `src/components/common/`: For reusable UI like `Button`, `Card`, or `Loader`.
    - `src/contexts/`: For global state (e.g., `AuthContext`).

---
