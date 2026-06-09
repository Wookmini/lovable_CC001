import React from "react";

interface DBLogoProps {
  className?: string;
}

export function DBLogo({ className = "" }: DBLogoProps) {
  return (
    <div className={`flex flex-col items-end ${className}`} style={{ width: 'fit-content' }}>
      <img 
        src="/db-logo.png" 
        alt="DB GlobalChip" 
        className="h-10 sm:h-12 object-contain"
      />
      <span 
        className="font-sans font-medium text-[15px] sm:text-[17px] tracking-tight text-[#009245] dark:text-[#00c055]"
        style={{ marginTop: '-2px', paddingRight: '2px' }}
      >
        동호회 커뮤니티
      </span>
    </div>
  );
}
