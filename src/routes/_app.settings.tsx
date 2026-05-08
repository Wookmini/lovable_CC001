import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Bell, Moon, Globe, Lock, HelpCircle, LogOut, ChevronLeft, User } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "설정 — DBG 동호회" }] }),
  component: SettingsPage,
});

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition ${on ? "bg-gradient-primary" : "bg-secondary"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${on ? "left-5" : "left-0.5"}`} />
    </button>
  );
}

function SettingsPage() {
  const [push, setPush] = useState(true);
  const [dark, setDark] = useState(false);
  const [sound, setSound] = useState(true);

  const sections: { title: string; items: { icon: any; label: string; right?: React.ReactNode; tone?: string }[] }[] = [
    {
      title: "계정",
      items: [
        { icon: User, label: "프로필 편집", right: <ChevronRight className="w-4 h-4 text-muted-foreground" /> },
        { icon: Lock, label: "보안 & 비밀번호", right: <ChevronRight className="w-4 h-4 text-muted-foreground" /> },
      ],
    },
    {
      title: "환경설정",
      items: [
        { icon: Bell, label: "푸시 알림", right: <Toggle on={push} onChange={() => setPush(!push)} /> },
        { icon: Moon, label: "다크 모드", right: <Toggle on={dark} onChange={() => setDark(!dark)} /> },
        { icon: Bell, label: "사운드", right: <Toggle on={sound} onChange={() => setSound(!sound)} /> },
        { icon: Globe, label: "언어", right: <span className="text-xs text-muted-foreground">한국어</span> },
      ],
    },
    {
      title: "지원",
      items: [
        { icon: HelpCircle, label: "도움말 & 문의", right: <ChevronRight className="w-4 h-4 text-muted-foreground" /> },
        { icon: LogOut, label: "로그아웃", tone: "destructive" },
      ],
    },
  ];

  return (
    <div className="px-5 pt-2 space-y-5">
      <header className="flex items-center gap-3">
        <Link to="/profile" className="w-9 h-9 grid place-items-center rounded-full glass">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold">설정</h1>
      </header>

      {sections.map((s) => (
        <section key={s.title}>
          <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-2 px-1">{s.title}</h3>
          <div className="glass rounded-3xl divide-y divide-border/50 overflow-hidden">
            {s.items.map((it) => {
              const Icon = it.icon;
              return (
                <button
                  key={it.label}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${
                    it.tone === "destructive" ? "text-destructive" : ""
                  }`}
                >
                  <div className={`w-9 h-9 rounded-2xl grid place-items-center ${
                    it.tone === "destructive" ? "bg-destructive/10 text-destructive" : "bg-secondary text-primary"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 font-medium text-sm">{it.label}</span>
                  {it.right}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      <p className="text-center text-[10px] text-muted-foreground pt-4 pb-2">
        DBG 동호회 v1.0.0 · Made with ♡
      </p>
    </div>
  );
}
