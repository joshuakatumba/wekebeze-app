import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { images } from "../../assets/images";

interface ChatOption {
  text: string;
  next: string;
}

interface ChatMessage {
  from: "user" | "doctor";
  text: string;
  image?: string;
  options?: ChatOption[];
}

interface ChatBubbleProps {
  msg: ChatMessage;
  onChoose: (option: ChatOption) => void;
}

export default function ChatBubble({ msg, onChoose }: ChatBubbleProps) {
  const isUser = msg.from === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3 mb-4`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-full border-2 overflow-hidden ${isUser ? "border-rose-100" : "border-primary-100"}`}>
          <img
            src={isUser ? images["user-avatar.jpg"] : images["doctor-avatar.svg"]}
            alt={isUser ? "You" : "Doctor"}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bubble Container */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`
            relative p-4 shadow-soft-md transition-all duration-200
            ${isUser
              ? "bg-rose-500 text-white rounded-2xl rounded-tr-none shadow-rose-500/10"
              : "bg-white text-primary-900 border border-primary-50 rounded-2xl rounded-tl-none"}
          `}
        >
          {/* Optional image */}
          {msg.image && (
            <img
              src={`/assets/images/${msg.image}`}
              alt=""
              className="mb-3 rounded-xl object-cover max-h-48 w-full border border-black/5"
            />
          )}

          {/* Message text */}
          <p className="text-sm sm:text-base leading-relaxed font-medium">
            {msg.text}
          </p>

          {/* Options buttons for doctor messages */}
          {!isUser && msg.options && msg.options.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {msg.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => onChoose(option)}
                  className="px-4 py-2 text-xs sm:text-sm bg-primary-50 text-primary-900 rounded-lg hover:bg-primary-900 hover:text-white border border-primary-100 transition-all active:scale-95 font-semibold"
                >
                  {option.text}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Reaction info for doctor messages */}
        {!isUser && (
          <div className="flex items-center gap-3 mt-2 ml-1">
            <button
              className="text-primary-300 hover:text-teal-500 transition-colors"
              aria-label="Like"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
            <button
              className="text-primary-300 hover:text-rose-500 transition-colors"
              aria-label="Dislike"
            >
              <ThumbsDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
