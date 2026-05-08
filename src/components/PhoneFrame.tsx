import { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-hero flex items-center justify-center p-0 sm:p-6">
      {/* desktop frame */}
      <div className="hidden sm:flex flex-col items-center gap-4">
        <div
          className="relative w-[390px] h-[820px] rounded-[3rem] bg-foreground/90 p-[14px] shadow-glow"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground rounded-b-2xl z-30" />
          <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-background">
            {children}
          </div>
        </div>
        <p className="text-xs text-muted-foreground tracking-widest uppercase">DBG · UI Kit Preview</p>
      </div>

      {/* mobile fullscreen */}
      <div className="sm:hidden w-full min-h-screen relative overflow-hidden bg-background">
        {children}
      </div>
    </div>
  );
}
