import { createFileRoute } from "@tanstack/react-router";
import { chats } from "@/lib/mock-data";
import { Search, Edit3, Megaphone, Pin } from "lucide-react";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "채팅 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Chat,
});

function Chat() {
  return (
    <div className="px-5 pt-2 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">채팅 & 공지</h1>
        <button className="w-10 h-10 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
          <Edit3 className="w-4 h-4" />
        </button>
      </header>

      <label className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input className="flex-1 bg-transparent outline-none text-sm" placeholder="대화방 검색" />
      </label>

      {/* announcement */}
      <div className="rounded-3xl p-4 bg-gradient-to-br from-peach/50 to-primary-glow/40 shadow-card">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Megaphone className="w-3.5 h-3.5" /> 공지
        </div>
        <p className="font-semibold leading-snug">5월 동호회 워크샵 일정이 확정되었습니다.</p>
        <p className="text-xs text-foreground/70 mt-1">5월 25일(일) 양평 펜션 · 신청은 ~5/18까지</p>
      </div>

      <section className="space-y-2">
        {chats.map((c) => (
          <div key={c.id} className="glass rounded-2xl p-3 flex items-center gap-3">
            {c.pinned ? (
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary grid place-items-center text-primary-foreground shadow-soft">
                <Megaphone className="w-5 h-5" />
              </div>
            ) : (
              <img src={c.avatar} className="w-12 h-12 rounded-2xl object-cover" onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239ca3af"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E'; }} />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                {c.pinned && <Pin className="w-3 h-3 text-primary fill-primary" />}
                <p className="font-semibold truncate">{c.name}</p>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{c.last}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-muted-foreground">{c.time}</span>
              {c.unread > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full bg-gradient-primary text-primary-foreground text-[10px] font-bold grid place-items-center">
                  {c.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
