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
  const { signup } = useAuth();
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
