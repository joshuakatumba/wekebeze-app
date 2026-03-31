import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, CheckCircle } from "lucide-react";

export default function LanguageSelect() {
  const { cancerType } = useParams();
  const nav = useNavigate();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const languages = [
    {
      code: "en",
      label: "English",
      native: "English",
      flag: "🇬🇧",
    },
    {
      code: "lg",
      label: "Luganda",
      native: "Luganda",
      flag: "🇺🇬",
    },
  ];

  return (
    <div className="bg-bg min-h-screen flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-xl w-full p-8 sm:p-12"
      >
        <button
          onClick={() => nav("/home")}
          className="group flex items-center gap-2 text-primary-400 hover:text-primary-900 transition-colors mb-10 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-rose-50 rounded-2xl mb-4">
            <Globe className="w-8 h-8 text-rose-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary-900 mb-3 tracking-tight">
            Choose Your <span className="text-rose-500">Language</span>
          </h1>
          <p className="text-primary-500 font-medium">
            "We want to ensure you understand everything clearly. Select the language you're most comfortable with."
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`
                relative flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300
                ${selectedLang === lang.code 
                  ? "border-rose-500 bg-rose-50/30 shadow-soft-md scale-[1.02]" 
                  : "border-primary-50 bg-white hover:border-primary-100 hover:bg-primary-50/30"}
              `}
            >
              <span className="text-4xl mb-3">{lang.flag}</span>
              <span className="text-lg font-bold text-primary-900">{lang.native}</span>
              <span className="text-xs font-medium text-primary-400 uppercase tracking-widest mt-1">{lang.label}</span>
              
              {selectedLang === lang.code && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                </motion.div>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <button
            disabled={!selectedLang}
            onClick={() => nav(`/chat/${cancerType}/${selectedLang}`)}
            className={`
              w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all
              ${selectedLang 
                ? "btn-primary shadow-[0_10px_20px_rgba(244,63,94,0.1)] hover:shadow-none" 
                : "bg-primary-50 text-primary-300 cursor-not-allowed"}
            `}
          >
            Start Awareness Session
          </button>
          
          <p className="text-center text-[10px] font-bold text-primary-300 uppercase tracking-[2px]">
            Informational purposes only. Not medical advice.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
