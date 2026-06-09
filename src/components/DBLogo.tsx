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
        className="font-bold text-[16px] sm:text-[18px] tracking-tight text-[#009245] dark:text-[#00c055]"
        style={{ 
          fontFamily: '"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          marginTop: '-4px', 
          marginLeft: '2.8rem' // 로고 심볼 너비만큼 밀어서 G부터 시작하도록 맞춤
        }}
      >
        동호회 커뮤니티
      </span>
    </div>
  );
}
