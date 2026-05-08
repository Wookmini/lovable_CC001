import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Users, Calendar, MessageCircle, User } from "lucide-react";

const tabs = [
  { to: "/home", label: "홈", icon: Home },
  { to: "/members", label: "회원", icon: Users },
  { to: "/events", label: "일정", icon: Calendar },
  { to: "/chat", label: "채팅", icon: MessageCircle },
  { to: "/profile", label: "프로필", icon: User },
] as const;

export function BottomTabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="absolute bottom-3 left-3 right-3 z-40">
      <div className="glass rounded-3xl px-2 py-2 flex items-center justify-between">
        {tabs.map((t) => {
          const active = path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`relative flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl transition-all ${
                active ? "bg-gradient-primary text-primary-foreground shadow-soft scale-105" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={active ? 2.4 : 1.8} />
              <span className="text-[10px] font-medium">{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
