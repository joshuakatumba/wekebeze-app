import React from "react";
import Icon from "../common/Icon";

interface ChatHeaderProps {
  title: React.ReactNode;
  onBack: () => void;
  className?: string;
}

export default function ChatHeader({ title, onBack, className }: ChatHeaderProps) {
  return (
    <div
      role="region"
      aria-label="Chat header"
      className={`flex items-center gap-3 p-4 border-b shadow-md font-serif ${className || "bg-white text-black"}`}
    >
      <button
        onClick={onBack}
        aria-label="back"
        className="p-2 bg-white/20 rounded"
      >
        <Icon name="back" />
      </button>
      <h2 role="heading" aria-level={2} className="text-lg font-semibold">
        {title}
      </h2>
    </div>
  );
}
