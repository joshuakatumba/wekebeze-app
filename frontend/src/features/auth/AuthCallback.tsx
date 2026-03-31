import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";

export default function AuthCallback() {
  const nav = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        nav("/home", { replace: true });
      }
    });
  }, [nav]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-primary-500 font-medium">Completing sign in...</p>
      </div>
    </div>
  );
}
