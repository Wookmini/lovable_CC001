import React from "react";

interface DBLogoProps {
  className?: string;
  size?: number;
}

export function DBLogo({ className = "", size = 48 }: DBLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* DB Green Left Crescent */}
      <path
        d="M 46 15 C 26 15, 14 33, 14 50 C 14 67, 26 85, 46 85 C 33 75, 29 60, 29 50 C 29 40, 33 25, 46 15 Z"
        fill="url(#db-green-grad)"
      />
      {/* DB Orange/Red Sun Circle */}
      <circle
        cx="48"
        cy="50"
        r="14"
        fill="url(#db-orange-grad)"
      />
      {/* DB Blue Right Crescent */}
      <path
        d="M 50 15 C 63 25, 67 40, 67 50 C 67 60, 63 75, 50 85 C 70 85, 82 67, 82 50 C 82 33, 70 15, 50 15 Z"
        fill="url(#db-blue-grad)"
      />

      <defs>
        {/* Gradients to add premium three-dimensional feel */}
        <linearGradient id="db-green-grad" x1="14" y1="50" x2="46" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4FB84F" />
          <stop offset="100%" stopColor="#00854A" />
        </linearGradient>
        <linearGradient id="db-orange-grad" x1="34" y1="50" x2="62" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F58220" />
          <stop offset="100%" stopColor="#F15A22" />
        </linearGradient>
        <linearGradient id="db-blue-grad" x1="50" y1="50" x2="82" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00A0E9" />
          <stop offset="100%" stopColor="#0088CB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
