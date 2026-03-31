import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Shield, BookOpen } from "lucide-react";
import { images } from "../../assets/images";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function WelcomeScreen() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background blobs for depth */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl"
      >
        <div className="glass-card overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Header / Logo */}
            <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
              <img
                src={images["wekebeze-logo.png"]}
                alt="Wekebeze Logo"
                className="h-20 w-auto mb-4"
              />
              <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-900 text-center uppercase tracking-normal">
                Wekebeze <span className="text-rose-500">App</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-2xl font-semibold text-primary-600 leading-tight">
                Empowering communities through cancer awareness. Together, we can make early detection a reality. 🤝
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: "Early Detection",
                  desc: "Detecting cancer early increases survival rates significantly.",
                  icon: <Shield className="w-8 h-8 text-rose-500" />,
                },
                {
                  title: "Screening Centers",
                  desc: "Find nearby facilities for breast and cervical screening.",
                  icon: <Heart className="w-8 h-8 text-rose-500" />,
                },
                {
                  title: "Education",
                  desc: "Learn and get trusted information in your language.",
                  icon: <BookOpen className="w-8 h-8 text-rose-500" />,
                },
              ].map((feature, i) => (
                <div key={i} className="bg-white/50 border border-white/40 p-6 rounded-2xl card-hover text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg text-primary-900 mb-2">{feature.title}</h3>
                  <p className="text-primary-500 text-sm">{feature.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Visual Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
               {[
                 { img: images.together, text: "Together, we can beat cancer" },
                 { img: images.awareness, text: "Your health matters" },
                 { img: images.education, text: "Hope is stronger than fear" },
               ].map((item, i) => (
                 <div key={i} className="group relative overflow-hidden rounded-2xl shadow-premium h-64">
                   <img src={item.img} alt={item.text} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent flex items-end p-4">
                     <p className="text-white font-semibold text-sm">{item.text}</p>
                   </div>
                 </div>
               ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => nav("/signup")}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => nav("/login")}
                className="btn-secondary w-full sm:w-auto"
              >
                Sign In
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
