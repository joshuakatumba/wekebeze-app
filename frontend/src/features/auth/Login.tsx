import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Heart } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import FloatingInput from "../../components/common/FloatingInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(email, password);
      if (result.success) {
        nav("/home");
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Left: Illustration/Quote (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900">
        <img
          src="/assets/images/auth-bg.png"
          alt="Healthcare support"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900 via-primary-900/40 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-end p-16 h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-lg"
          >
            <Heart className="w-12 h-12 text-rose-500 mb-6" />
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Hope is the heartbeat of health.
            </h2>
            <p className="text-xl text-primary-100 font-medium opacity-90">
              "Understanding cancer awareness today can lead to a healthier tomorrow. We're here to walk that path with you."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-4xl font-extrabold text-primary-900 mb-2">Welcome Back</h1>
            <p className="text-primary-500 font-medium">Please sign in to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-3 font-medium text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-2">
            <FloatingInput
              label="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <FloatingInput
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <div className="flex items-center justify-between mb-8">
               <label className="flex items-center gap-2 text-sm text-primary-500 cursor-pointer">
                 <input type="checkbox" className="rounded border-primary-100 text-rose-500 focus:ring-rose-500" />
                 Remember me
               </label>
               <button type="button" className="text-sm font-semibold text-rose-600 hover:text-rose-700">
                 Forgot password?
               </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-primary-500 font-medium">
            Don't have an account?{" "}
            <button
              onClick={() => nav("/signup")}
              className="text-rose-600 font-bold hover:text-rose-700 transition"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
