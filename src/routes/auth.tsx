import { createFileRoute, Link } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { GradientBlob } from "@/components/GradientBlob";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "로그인 — DBG 동호회" }] }),
  component: Auth,
});

function Auth() {
  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden">
        <GradientBlob />
        <div className="relative z-10 h-full flex flex-col px-7 pt-16 pb-10">
          <div className="mb-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground font-bold shadow-soft mb-6">D</div>
            <h1 className="text-3xl font-bold leading-tight">다시 만나서<br/>반가워요 👋</h1>
            <p className="text-muted-foreground mt-2 text-sm">사번 이메일로 로그인해 주세요.</p>
          </div>

          <div className="glass rounded-3xl p-5 space-y-3">
            <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/60 border border-border">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input className="flex-1 bg-transparent outline-none text-sm" placeholder="name@dbg.co.kr" defaultValue="minjun@dbg.co.kr" />
            </label>
            <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/60 border border-border">
              <Lock className="w-4 h-4 text-muted-foreground" />
              <input type="password" className="flex-1 bg-transparent outline-none text-sm" placeholder="비밀번호" defaultValue="********" />
            </label>
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" defaultChecked /> 자동 로그인
              </label>
              <button>비밀번호 찾기</button>
            </div>
          </div>

          <Link
            to="/home"
            className="mt-6 w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-center font-semibold shadow-glow flex items-center justify-center gap-2"
          >
            로그인 <ArrowRight className="w-4 h-4" />
          </Link>

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
