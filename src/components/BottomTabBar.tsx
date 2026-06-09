import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Users, Calendar, MessageCircle, User } from "lucide-react";
import { DBLogo } from "@/components/DBLogo";

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
    <nav className="absolute bottom-3 left-3 right-3 z-40 sm:relative sm:bottom-0 sm:left-0 sm:right-0 sm:w-64 sm:h-full sm:bg-secondary/20 sm:border-r sm:border-border/50">
      <div className="glass rounded-3xl px-2 py-2 flex items-center justify-between sm:flex-col sm:items-stretch sm:justify-start sm:p-6 sm:h-full sm:rounded-none sm:glass-none sm:bg-transparent sm:border-none sm:shadow-none sm:gap-2">
        <div className="hidden sm:flex items-start mb-8 px-2 mt-4">
          <DBLogo />
        </div>
        {tabs.map((t) => {
          const active = path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`relative flex-1 sm:flex-none flex flex-col sm:flex-row items-center sm:justify-start gap-0.5 sm:gap-3 py-1.5 sm:py-3 sm:px-4 rounded-2xl transition-all ${
                active ? "bg-gradient-primary text-primary-foreground shadow-soft scale-105 sm:scale-100" : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className="w-5 h-5 sm:w-5 sm:h-5" strokeWidth={active ? 2.4 : 1.8} />
              <span className={`text-[10px] sm:text-sm font-medium ${active ? "sm:font-bold" : ""}`}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
