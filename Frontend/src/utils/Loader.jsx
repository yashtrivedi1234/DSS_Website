// components/Loader.jsx
import React from "react";

export default function Loader({ size = 40, text = "" }) {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <div className="flex flex-col items-center h-[50vh] justify-center py-6">
      <svg
        width={px}
        height={px}
        viewBox="0 0 50 50"
        className="animate-spin"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" /> 
            <stop offset="100%" stopColor="#3b82f6" /> 
          </linearGradient>
        </defs>

        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#e6eefc"
          strokeWidth="5"
          fill="none"
        />

        <path
          d="M25 5 a20 20 0 0 1 0 40"
          stroke="url(#g1)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {text ? (
        <span className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          {text}
        </span>
      ) : null}
    </div>
  );
}
