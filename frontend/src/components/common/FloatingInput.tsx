import React, { useState } from "react";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, id, value, onChange, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.toString().length > 0;

  return (
    <div className="relative mb-6 group">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full px-4 py-3 bg-white border rounded-xl outline-none transition-all duration-200
          ${isFocused || hasValue ? "border-rose-500 pt-6 pb-2" : "border-primary-100 py-4"}
          focus:ring-4 focus:ring-rose-500/10
        `}
        {...props}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none
          ${isFocused || hasValue 
            ? "top-2 text-xs font-bold text-rose-500" 
            : "top-1/2 -translate-y-1/2 text-primary-400 text-sm"}
          group-hover:text-rose-400
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
