import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, MapPin } from "lucide-react";
import { images } from "../../../assets/images.js";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

export default function AwarenessHome() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-bg pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
           <div className="absolute top-10 left-10 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-50 animate-blob" />
           <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-rose-50 text-rose-500 text-xs font-black uppercase tracking-widest rounded-full mb-6">
            Empowerment through knowledge
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-900 mb-6 leading-tight">
            Protect Your Future with <span className="text-rose-500 underline decoration-rose-200 underline-offset-8">Awareness</span>
          </h1>
          <p className="text-xl text-primary-500 font-medium max-w-2xl mx-auto mb-12">
            "Early detection is a powerful tool in the fight against cancer. We help you understand the risks and find the support you need."
          </p>
          
          <div className="relative glass-card p-4 sm:p-6 overflow-hidden max-w-4xl mx-auto">
            <img
              src={images.banner}
              alt="Cancer Awareness"
              className="w-full h-auto rounded-xl shadow-soft-md object-cover max-h-[400px]"
            />
          </div>
        </motion.div>
      </section>

      {/* INFO CARDS SECTION */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 relative z-20 -mt-16"
      >
        {/* Cervical Cancer */}
        <motion.div variants={itemVariants} className="glass-card p-10 flex flex-col items-center text-center group cursor-default">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-teal-200/30 rounded-full blur-xl group-hover:blur-2xl transition-all" />
            <img
              src={images.cervical}
              alt="Cervical Cancer"
              className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-soft-md"
            />
          </div>
          <h3 className="text-2xl font-black text-primary-900 mb-4 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-500" />
            Cervical Cancer
          </h3>
          <p className="text-primary-500 font-medium leading-relaxed mb-8">
            "Understanding risks and early signs is vital. Knowledge empowers you to take action and prevent complications before they start."
          </p>
          <button
            onClick={() => nav("/language/cervical")}
            className="btn-secondary flex items-center gap-2 group/btn"
          >
            Start Awareness Journey
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Breast Cancer */}
        <motion.div variants={itemVariants} className="glass-card p-10 flex flex-col items-center text-center group cursor-default">
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-rose-200/30 rounded-full blur-xl group-hover:blur-2xl transition-all" />
            <img
              src={images.breast}
              alt="Breast Cancer"
              className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-soft-md"
            />
          </div>
          <h3 className="text-2xl font-black text-primary-900 mb-4 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-rose-500" />
            Breast Cancer
          </h3>
          <p className="text-primary-500 font-medium leading-relaxed mb-8">
            "Awareness is your first line of defense. Recognising signs early can transform outcomes and save lives through timely intervention."
          </p>
          <button
            onClick={() => nav("/language/breast")}
            className="btn-secondary flex items-center gap-2 group/btn"
          >
            Start Awareness Journey
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.section>

      {/* LOCATOR CTA */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 mt-24"
      >
        <div className="relative overflow-hidden bg-primary-900 rounded-[2.5rem] p-10 md:p-16 shadow-premium">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
               <img
                src={images.locator}
                alt="Facility Locator"
                className="rounded-3xl shadow-xl border-4 border-white/10"
              />
            </div>
            
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Find Trusted Screening Centers Near You
              </h2>
              <p className="text-primary-100/80 text-lg font-medium mb-10">
                Don't guess when it comes to your health. Use our expert-vetted locator to find accessible facilities quickly and start your check-up today.
              </p>
              <button
                onClick={() => nav("/screening-locator")}
                className="btn-primary flex items-center gap-3 mx-auto lg:mx-0 shadow-[0_10px_20px_rgba(244,63,94,0.3)] hover:shadow-none"
              >
                <MapPin className="w-5 h-5" />
                Find Nearby Centers
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
