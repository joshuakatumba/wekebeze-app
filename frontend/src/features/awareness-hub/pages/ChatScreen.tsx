import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RotateCcw, Share2, Info } from "lucide-react";
import useChatFlow from "../../../hooks/useChatFlow";
import ChatHeader from "../../../components/chat/ChatHeader";
import ChatBubble from "../../../components/chat/ChatBubble";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import Quiz from "./Quiz";
import { t } from "../../../utils/i18n.ts";
import { images } from "../../../assets/images";
import { progressAPI } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

export default function ChatScreen() {
  const { cancerType = "breast", lang = "en" } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const { messages, typing, chooseOption, goBack, restart } = useChatFlow(
    cancerType,
    lang
  );
  const listRef = useRef<HTMLDivElement>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const lastDoctorMsg = messages
    .filter((m) => m.from === "doctor")
    .slice(-1)[0];
  const hasOptions = (lastDoctorMsg?.options?.length ?? 0) > 0;

  useEffect(() => {
    if (!hasOptions && messages.length > 1 && !showQuiz) {
      setShowQuiz(true);
    }
  }, [hasOptions, messages, showQuiz]);

  const exportChat = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `chat-${cancerType}-${lang}.json`;
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const recordCompletion = async () => {
    if (user) {
      try {
        await progressAPI.saveChatProgress(cancerType, "completed", true);
      } catch (err) {
        console.error("Failed to save chat progress to API:", err);
      }
    }
    const analytics = JSON.parse(localStorage.getItem("analytics") || "[]");
    analytics.push({
      type: "chat_completion",
      cancerType,
      lang,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("analytics", JSON.stringify(analytics));
  };

  const handleQuizComplete = async (score: number, total: number) => {
    recordCompletion();
    if (user) {
      try {
        await progressAPI.saveQuizScore(cancerType, score, total);
      } catch (err) {
        console.error("Failed to save quiz score to API:", err);
      }
    }
    const quizAnalytics = JSON.parse(
      localStorage.getItem("quizAnalytics") || "[]"
    );
    quizAnalytics.push({
      cancerType,
      score,
      total,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("quizAnalytics", JSON.stringify(quizAnalytics));
  };

  if (!messages.length)
    return (
      <div className="flex items-center justify-center h-screen bg-bg">
        <LoadingSpinner />
      </div>
    );

  if (showQuiz) {
    return <Quiz cancerType={cancerType} onComplete={handleQuizComplete} />;
  }

  return (
    <div className="bg-bg min-h-screen flex items-center justify-center p-0 sm:p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="chat-card w-full max-w-4xl bg-white sm:rounded-3xl shadow-premium flex flex-col overflow-hidden border border-primary-50"
      >
        <ChatHeader
          title={t(`cancers.${cancerType}.title`, lang)}
          onBack={() => nav(`/language/${cancerType}`)}
          className="bg-white border-b border-primary-50 px-6 py-4"
        />

        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-atomic="false"
          className="flex-1 overflow-auto p-4 sm:p-8 space-y-2 bg-[#fdfdfd]"
        >
          <AnimatePresence initial={false}>
            {messages.map((m, idx) => (
              <ChatBubble key={idx} msg={m} onChoose={chooseOption} />
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 p-1"
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary-100 overflow-hidden">
                <img
                  src={images["doctor-avatar.svg"]}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-4 py-3 bg-white border border-primary-50 rounded-2xl rounded-tl-none shadow-soft-md">
                <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-primary-300 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Panel */}
        <div className="bg-white border-t border-primary-50 p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={goBack}
            className="flex items-center justify-center gap-2 px-4 py-2.5 btn-secondary text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("actions.back", lang)}
          </button>
          <button
            onClick={restart}
            className="flex items-center justify-center gap-2 px-4 py-2.5 btn-secondary text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            {t("actions.restart", lang)}
          </button>
          <button
            onClick={exportChat}
            className="flex items-center justify-center gap-2 px-4 py-2.5 btn-secondary text-sm"
          >
            <Share2 className="w-4 h-4" />
            {t("actions.export", lang)}
          </button>
          <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-4 py-2 underline text-primary-400 text-xs text-center">
            <Info className="w-3 h-3 flex-shrink-0" />
            "For informational purposes only."
          </div>
        </div>
      </motion.div>
    </div>
  );
}
