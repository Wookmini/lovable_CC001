import { createFileRoute } from "@tanstack/react-router";
import { events, members } from "@/lib/mock-data";
import { Plus, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/events")({
  head: () => ({ meta: [{ title: "일정 — DBG 동호회" }] }),
  component: Events,
});

const days = [
  { d: 10, w: "월" }, { d: 11, w: "화" }, { d: 12, w: "수", active: true }, { d: 13, w: "목" },
  { d: 14, w: "금" }, { d: 15, w: "토" }, { d: 16, w: "일" },
];

function Events() {
  return (
    <div className="px-5 pt-2 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">May 2026</p>
          <h1 className="text-2xl font-bold mt-0.5">이벤트 & 모임</h1>
        </div>
        <button className="w-10 h-10 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
          <Plus className="w-4 h-4" />
        </button>
      </header>

      {/* mini calendar */}
      <div className="glass rounded-3xl p-3 flex justify-between gap-1">
        {days.map((d) => (
          <button
            key={d.d}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-2xl transition ${
              d.active ? "bg-gradient-primary text-primary-foreground shadow-soft" : "text-foreground"
            }`}
          >
            <span className="text-[10px] opacity-70">{d.w}</span>
            <span className="font-bold">{d.d}</span>
            {!d.active && [11, 15].includes(d.d) && <span className="w-1 h-1 rounded-full bg-primary" />}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold">전체</button>
        <button className="px-3 py-1.5 rounded-full glass text-xs font-semibold">참여 중</button>
        <button className="px-3 py-1.5 rounded-full glass text-xs font-semibold">관심</button>
      </div>

      <section className="space-y-3">
        {events.map((e) => (
          <div key={e.id} className="glass rounded-3xl p-4 shadow-card">
            <div className="flex items-start gap-3">
              <div className={`w-14 h-16 rounded-2xl bg-gradient-to-br ${e.color} grid place-items-center shadow-soft`}>
                <div className="text-center leading-tight">
                  <p className="text-[10px] font-bold opacity-70">{e.date.split(" ")[0]}</p>
                  <p className="text-xl font-bold">{e.date.split(" ")[1].replace("일", "")}</p>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-secondary px-2 py-0.5 rounded-full">
                  {e.team}
                </span>
                <h4 className="font-bold mt-1 leading-tight">{e.title}</h4>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {e.time}</span>
                  <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3" /> {e.place}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
              <div className="flex -space-x-1.5">
                {members.slice(0, 3).map((m) => (
                  <img key={m.id} src={m.avatar} className="w-6 h-6 rounded-full border-2 border-background" />
                ))}
                <span className="text-[11px] text-muted-foreground ml-2 self-center">+{e.attendees - 3}명 참여</span>
              </div>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground">
                RSVP
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
