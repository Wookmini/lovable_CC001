import { createFileRoute, Link } from "@tanstack/react-router";
import { useAppContext } from "../context/AppContext";
import { Bell, Search, Plus, ArrowRight, Image, Settings } from "lucide-react";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "홈 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Home,
});

function Home() {
  const { members, currentUser, events, gallery, toggleRSVP } = useAppContext();
  const heroEvent = events[0];

  return (
    <div className="px-5 sm:px-8 pt-2 sm:pt-6 space-y-5 sm:space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">2026년 5월 8일 · 금요일</p>
          <h1 className="text-2xl font-bold leading-tight mt-0.5">안녕하세요, <span className="text-primary">{currentUser.name}</span>님 ☀️</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 grid place-items-center rounded-full glass">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative w-10 h-10 grid place-items-center rounded-full glass">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
          </button>
        </div>
      </header>

      {/* hero card */}
      {heroEvent && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary text-primary-foreground p-5 shadow-glow">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/15 blur-2xl" />
          <p className="text-xs uppercase tracking-widest opacity-80">이번 주 모임</p>
          <h2 className="text-xl font-bold mt-1 leading-tight">{heroEvent.title}</h2>
          <p className="text-xs opacity-90 mt-1">{heroEvent.date} · {heroEvent.time} · {heroEvent.place}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex -space-x-2">
              {members.slice(0, 4).map((m) => (
                <img key={m.id} src={m.avatar} className="w-7 h-7 rounded-full border-2 border-white" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E'; }} />
              ))}
              <div className="w-7 h-7 rounded-full bg-white/30 grid place-items-center text-[10px] font-semibold border-2 border-white">+{heroEvent.attendees}</div>
            </div>
            <button 
              onClick={() => toggleRSVP(heroEvent.id)}
              className={`backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                heroEvent.isAttending ? "bg-white text-primary" : "bg-white/25 text-white"
              }`}
            >
              {heroEvent.isAttending ? "참여 중 ✔️" : <>참여 <ArrowRight className="w-3 h-3" /></>}
            </button>
          </div>
        </div>
      )}

      {/* quick actions */}
      <section>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {[
            { to: "/events", label: "일정", icon: "📅" },
            { to: "/members", label: "회원", icon: "👥" },
            { to: "/gallery", label: "갤러리", icon: "🖼️" },
            { to: "/settings", label: "설정", icon: "⚙️" },
          ].map((q) => (
            <Link key={q.to} to={q.to} className="glass rounded-2xl py-3.5 flex flex-col items-center gap-1 active:scale-95 transition">
              <span className="text-xl">{q.icon}</span>
              <span className="text-[11px] font-medium">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* upcoming */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-heading font-bold">다가오는 모임</h3>
          <Link to="/events" className="text-xs text-primary font-semibold">전체 보기</Link>
        </div>
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto sm:overflow-visible no-scrollbar -mx-5 sm:mx-0 px-5 sm:px-0 pb-2">
          {events.slice(0, 3).map((e) => (
            <div key={e.id} className={`min-w-[180px] rounded-2xl p-4 bg-gradient-to-br ${e.color} shadow-card`}>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-white/60 backdrop-blur px-2 py-0.5 rounded-full">
                {e.team}
              </span>
              <h4 className="font-bold mt-2 leading-tight">{e.title}</h4>
              <p className="text-[11px] text-foreground/70 mt-1">{e.date} · {e.time}</p>
              <p className="text-[11px] text-foreground/60 mt-0.5">{e.place}</p>
            </div>
          ))}
        </div>
      </section>

      {/* recent activity */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-heading font-bold">최근 활동</h3>
          <Link to="/gallery" className="text-xs text-primary font-semibold flex items-center gap-1">
            <Image className="w-3 h-3" /> 갤러리
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {gallery.slice(0, 5).map((g) => (
            <div key={g.id} className="aspect-square rounded-2xl overflow-hidden shadow-card">
              <img src={g.url} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
