import React from "react";
export default function Icon({ name, className = "" }) {
  const icons = {
    back: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    ),
  };
  return (
    <span aria-hidden="true" className={className}>
      {icons[name] || null}
    </span>
  );
}
