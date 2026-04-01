import { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import WelcomeScreen from "../features/welcome/WelcomeScreen";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import AuthCallback from "../features/auth/AuthCallback";
import AwarenessHome from "../features/awareness-hub/pages/AwarenessHome";
import LanguageSelect from "../features/awareness-hub/pages/LanguageSelect";
import ChatScreen from "../features/awareness-hub/pages/ChatScreen";
import ScreeningLocator from "../features/awareness-hub/pages/ScreeningLocator";
import {
  AdminDashboard,
  UserManagement,
  Analytics,
  ChatNodeManagement,
  ScreeningCenterManagement,
  QuizManagement,
} from "../features/admin";

// Protected Route component for admin routes
const AdminRoute = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/home" element={<AwarenessHome />} />
      <Route path="/language/:cancerType" element={<LanguageSelect />} />
      <Route path="/chat/:cancerType/:lang" element={<ChatScreen />} />
      <Route path="/screening-locator" element={<ScreeningLocator />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AdminRoute>
            <Analytics />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/chat-nodes"
        element={
          <AdminRoute>
            <ChatNodeManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/screening-centers"
        element={
          <AdminRoute>
            <ScreeningCenterManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/quizzes"
        element={
          <AdminRoute>
            <QuizManagement />
          </AdminRoute>
        }
      />
    </Routes>
  );
}
