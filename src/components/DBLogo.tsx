import React from "react";

interface DBLogoProps {
  className?: string;
}

export function DBLogo({ className = "" }: DBLogoProps) {
  return (
    <div className={`flex flex-col gap-1 items-start ${className}`}>
      <img 
        src="/db-logo.png" 
        alt="DB GlobalChip" 
        className="h-6 sm:h-7 object-contain"
      />
      <span className="font-heading font-bold text-sm tracking-tight text-foreground pl-1">
        동호회 커뮤니티
      </span>
    </div>
  );
}
