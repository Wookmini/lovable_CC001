import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { GradientBlob } from "@/components/GradientBlob";
import { DBLogo } from "@/components/DBLogo";
import { User, Lock, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "로그인 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Auth,
});

function Auth() {
  const { isLoggedIn, login } = useAppContext();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    login(1);
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden">
        <GradientBlob />
        <div className="relative z-10 h-full flex flex-col px-7 pt-16 pb-10">
          <div className="mb-10">
            <DBLogo size={48} className="mb-6 shadow-soft rounded-2xl" />
            <h1 className="text-3xl font-bold leading-tight">다시 만나서<br />반가워요 👋</h1>
            <p className="text-muted-foreground mt-2 text-sm">사원번호와 생년월일로 로그인해 주세요.</p>
          </div>

          <div className="glass rounded-3xl p-5 space-y-3">
            <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/60 border border-border">
              <User className="w-4 h-4 text-muted-foreground" />
              <input className="flex-1 bg-transparent outline-none text-sm" placeholder="사원번호 (예: 20000177)" defaultValue="20000177" />
            </label>
            <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/60 border border-border">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <input type="password" className="flex-1 bg-transparent outline-none text-sm" placeholder="생년월일 6자리 (YYMMDD)" defaultValue="950101" />
            </label>
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" defaultChecked /> 자동 로그인
              </label>
              <button>비밀번호 찾기</button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="mt-6 w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-center font-semibold shadow-glow flex items-center justify-center gap-2"
          >
            로그인 <ArrowRight className="w-4 h-4" />
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> 또는 <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="glass rounded-2xl py-3 text-sm font-medium">사내 SSO</button>
            <button className="glass rounded-2xl py-3 text-sm font-medium">게스트로</button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-auto">
            아직 가입 전이세요? <span className="text-primary font-semibold">관리자에게 요청</span>
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
