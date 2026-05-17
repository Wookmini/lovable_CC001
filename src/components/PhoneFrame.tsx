import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background sm:bg-gradient-hero flex items-center justify-center">
      {/* Container for PC and Mobile */}
      <div className="w-full h-screen sm:h-[calc(100vh-2rem)] sm:max-w-[1200px] sm:rounded-3xl sm:shadow-glow bg-background overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
