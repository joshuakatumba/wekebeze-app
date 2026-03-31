import React from "react";

export default function QuickOptionButtons({ options = [], onChoose }) {
  return (
    <div className="flex flex-wrap gap-2 p-3">
      {options.map((o, idx) => (
        <button
          key={idx}
          onClick={() => onChoose(o)}
          aria-label={`Select ${o.text}`}
          data-next={o.next}
          className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:shadow"
        >
          {o.text}
        </button>
      ))}
    </div>
  );
}
