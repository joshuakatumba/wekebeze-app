import React from "react";
import { useNavigate } from "react-router-dom";
import { resolveImage } from "../../utils/imageUtils";

export default function CancerCategoryCard({ type, title, img }) {
  const nav = useNavigate();
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (type === "screening_locator") {
        nav("/screening-locator");
      } else {
        nav(`/language/${type}`);
      }
    }
  };

  const handleClick = () => {
    if (type === "screening_locator") {
      nav("/screening-locator");
    } else {
      nav(`/language/${type}`);
    }
  };

  return (
    <div
      role="button"
      aria-label={`Open ${title} chat`}
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={handleClick}
      className="cursor-pointer overflow-hidden rounded-lg transform hover:scale-[1.02] transition shadow-soft-md"
    >
      <div className="relative h-44">
        <img
          src={resolveImage(img)}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute left-4 bottom-4 text-white">
          <h3 className="text-lg font-semibold drop-shadow">{title}</h3>
        </div>
      </div>
      <div className="p-3 bg-white">
        <p className="text-sm text-gray-600">Tap to open chat and learn more</p>
      </div>
    </div>
  );
}
