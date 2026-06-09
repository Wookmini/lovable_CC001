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
        className="font-bold text-[1.05rem] tracking-tight text-[#009245] dark:text-[#00c055]"
        style={{ 
          fontFamily: '"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          marginTop: '-4px',
          marginRight: '0.1rem' // p 글자 끝선과 티 글자 끝선 칼맞춤용 미세 조정
        }}
      >
        동호회 커뮤니티
      </span>
    </div>
  );
}
