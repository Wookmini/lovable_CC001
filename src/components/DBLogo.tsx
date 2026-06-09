import React from "react";

interface DBLogoProps {
  className?: string;
}

export function DBLogo({ className = "" }: DBLogoProps) {
  return (
    <div className={`flex flex-col gap-1.5 items-start ${className}`}>
      <img 
        src="/db-logo.png" 
        alt="DB GlobalChip" 
        className="h-12 sm:h-14 object-contain"
      />
      <span className="font-sans font-semibold text-lg tracking-tight text-slate-600 dark:text-slate-300 pl-1.5">
        동호회 커뮤니티
      </span>
    </div>
  );
}
