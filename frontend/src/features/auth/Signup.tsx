import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, Heart, Award } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import FloatingInput from "../../components/common/FloatingInput";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup, signInWithGoogle } = useAuth();
  const [googleLoading, setGoogleLoading] = useState(false);
  const nav = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signup({
        name,
        email,
        password,
        gender,
        age,
        language: "en",
      });
      if (result.success) {
        nav("/home");
      } else {
        setError(result.error || "Signup failed");
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
            <Award className="w-12 h-12 text-rose-500 mb-6" />
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Your health is your greatest wealth.
            </h2>
            <p className="text-xl text-primary-100 font-medium opacity-90">
              "Join our community today to access trusted cancer awareness, screening resources, and personalized support in your language."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl font-extrabold text-primary-900 mb-2">Create Account</h1>
            <p className="text-primary-500 font-medium">Join us in the fight against cancer</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-3 font-medium text-sm"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-1">
            <FloatingInput
              label="Full Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />

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

            <div className="grid grid-cols-2 gap-4">
              <div className="relative mb-6">
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-4 bg-white border border-primary-100 rounded-xl outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all text-sm appearance-none"
                  required
                  disabled={loading}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-400">
                  <Heart className="w-4 h-4" />
                </div>
              </div>

              <FloatingInput
                label="Age"
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="1"
                max="120"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-primary-100" />
            <span className="text-sm text-primary-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-primary-100" />
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={async () => {
              setGoogleLoading(true);
              setError("");
              const result = await signInWithGoogle();
              if (!result.success) {
                setError(result.error || "Google sign-in failed");
                setGoogleLoading(false);
              }
            }}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-primary-100 rounded-xl font-semibold text-primary-900 hover:bg-primary-50 hover:border-primary-200 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continue with Google
          </button>

          <p className="mt-8 text-center text-primary-500 font-medium">
            Already have an account?{" "}
            <button
              onClick={() => nav("/login")}
              className="text-rose-600 font-bold hover:text-rose-700 transition"
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
