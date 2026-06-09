import React from "react";

interface DBLogoProps {
  className?: string;
}

export function DBLogo({ className = "" }: DBLogoProps) {
  return (
    <div className={`flex flex-col items-start ${className}`} style={{ width: 'fit-content' }}>
      <img 
        src="/db-logo.png" 
        alt="DB GlobalChip" 
        className="h-10 sm:h-12 object-contain"
      />
      <span 
        className="font-bold text-[1.1rem] tracking-tight text-[#009245] dark:text-[#00c055] pl-[3.0rem] sm:pl-[3.5rem]"
        style={{ 
          fontFamily: '"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          marginTop: '-4px'
        }}
      >
        동호회 커뮤니티
      </span>
    </div>
  );
}
