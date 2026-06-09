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
      <span className="font-sans font-bold text-[1.1rem] tracking-tight text-[#00923f] dark:text-[#00c055] pl-[3.2rem] sm:pl-[3.8rem] -mt-1">
        동호회 커뮤니티
      </span>
    </div>
  );
}
