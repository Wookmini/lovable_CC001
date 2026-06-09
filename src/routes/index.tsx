import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { GradientBlob } from "@/components/GradientBlob";
import { DBLogo } from "@/components/DBLogo";
import { ArrowRight, Users, Calendar, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DB글로벌칩 동호회 커뮤니티" },
      { name: "description", content: "DB글로벌칩 사내 동호회를 위한 모바일 앱. 모임, 회원, 채팅, 갤러리를 한 곳에서." },
    ],
  }),
  component: Onboarding,
});

const slides = [
  {
    icon: Users,
    title: "동료와 더 가까이",
    desc: "관심사로 모인 사내 동호회를\n한 손에서 관리하세요.",
    bg: "from-primary-glow/40 to-secondary/60",
  },
  {
    icon: Calendar,
    title: "모임을 놓치지 않게",
    desc: "다가오는 일정과 RSVP를\n한눈에 확인할 수 있어요.",
    bg: "from-peach/40 to-primary-glow/30",
  },
  {
    icon: Sparkles,
    title: "추억을 함께",
    desc: "활동 사진과 이야기로\n동호회의 순간을 기록해요.",
    bg: "from-secondary/60 to-peach/40",
  },
];

function Onboarding() {
  const { hasSeenOnboarding, completeOnboarding } = useAppContext();
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  if (hasSeenOnboarding) {
    return <Navigate to="/auth" replace />;
  }

  const last = i === slides.length - 1;
  const S = slides[i];
  const Icon = S.icon;
  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden">
        <GradientBlob />
        <div className={`absolute inset-0 bg-gradient-to-br ${S.bg} transition-all duration-700`} />
        <div className="relative z-10 h-full flex flex-col px-7 pt-14 pb-10">
          <div className="flex items-center justify-between">
            <DBLogo />
            {!last && (
              <button 
                onClick={() => {
                  completeOnboarding();
                  navigate({ to: "/auth" });
                }} 
                className="text-xs text-muted-foreground"
              >
                건너뛰기
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-40 h-40 rounded-[2.5rem] glass grid place-items-center mb-10 shadow-glow">
              <Icon className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-3">{S.title}</h1>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{S.desc}</p>
          </div>

          <div className="flex items-center justify-center gap-1.5 mb-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-1.5 bg-foreground/20"}`}
              />
            ))}
          </div>

          {last ? (
            <Link
              to="/auth"
              onClick={() => completeOnboarding()}
              className="w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-center font-semibold shadow-glow flex items-center justify-center gap-2"
            >
              시작하기 <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              onClick={() => setI(i + 1)}
              className="w-full bg-foreground text-background rounded-2xl py-4 font-semibold shadow-soft flex items-center justify-center gap-2"
            >
              다음 <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
