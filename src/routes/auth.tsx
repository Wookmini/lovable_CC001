import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { GradientBlob } from "@/components/GradientBlob";
import { DBLogo } from "@/components/DBLogo";
import { User, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAppContext } from "@/context/AppContext";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "로그인 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const { switchUser } = useAppContext();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !password) {
      setError("사원번호와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    // 가상 이메일 생성 (사원번호@dbglobalchip.local)
    const email = `${employeeId}@dbglobalchip.local`;

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        setError("사원번호 또는 비밀번호가 일치하지 않습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다: " + signInError.message);
      }
      setIsLoading(false);
      return;
    }

    if (data.user) {
      // Check if profile exists, if not try to create one
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single();
        
      if (!profile) {
        await supabase.from('profiles').insert([
          { 
            id: data.user.id, 
            employee_id: employeeId, 
            full_name: `사원 ${employeeId}`, 
            department: '소속 없음' 
          }
        ]);
      }
      
      switchUser(data.user.id);
    }

    // 로그인 성공 시 홈으로 이동
    navigate({ to: "/home" });
  };

  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden">
        <GradientBlob />
        <div className="relative z-10 h-full flex flex-col px-7 pt-16 pb-10">
          <div className="mb-10">
            <DBLogo className="mb-8" />
            <h1 className="text-3xl font-bold leading-tight">다시 만나서<br />반가워요 👋</h1>
            <p className="text-muted-foreground mt-2 text-sm">사원번호와 생년월일로 로그인해 주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col flex-1">
            <div className="glass rounded-3xl p-5 space-y-3">
              <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/60 border border-border focus-within:ring-1 focus-within:ring-primary transition-all">
                <User className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm" 
                  placeholder="사원번호 (예: 20000177)" 
                />
              </label>
              <label className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background/60 border border-border focus-within:ring-1 focus-within:ring-primary transition-all">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm" 
                  placeholder="생년월일 6자리 (YYMMDD)" 
                />
              </label>
              
              {error && (
                <p className="text-destructive text-xs font-medium px-2 py-1">{error}</p>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground px-1 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-primary" defaultChecked /> 자동 로그인
                </label>
                <button type="button" className="hover:text-foreground transition-colors">비밀번호 찾기</button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-center font-semibold shadow-glow flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>로그인 <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex-1 h-px bg-border" /> 또는 <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="glass rounded-2xl py-3 text-sm font-medium hover:bg-white/40 transition-colors">사내 SSO</button>
              <button type="button" className="glass rounded-2xl py-3 text-sm font-medium hover:bg-white/40 transition-colors">게스트로</button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-auto">
              아직 가입 전이세요? <span className="text-primary font-semibold cursor-pointer">관리자에게 요청</span>
            </p>
          </form>
        </div>
      </div>
    </PhoneFrame>
  );
}
