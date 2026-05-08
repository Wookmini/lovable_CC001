import { createFileRoute } from "@tanstack/react-router";
import { members } from "@/lib/mock-data";
import { Search, UserPlus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_app/members")({
  head: () => ({ meta: [{ title: "회원 — DBG 동호회" }] }),
  component: Members,
});

const teams = ["전체", "러닝", "독서", "등산", "사진", "요가"];

function Members() {
  const [team, setTeam] = useState("전체");
  const list = team === "전체" ? members : members.filter((m) => m.team === team);
  return (
    <div className="px-5 pt-2 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">회원</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{members.length}명의 동호회원</p>
        </div>
        <button className="w-10 h-10 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
          <UserPlus className="w-4 h-4" />
        </button>
      </header>

      <label className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input className="flex-1 bg-transparent outline-none text-sm" placeholder="이름 또는 팀 검색" />
      </label>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
        {teams.map((t) => (
          <button
            key={t}
            onClick={() => setTeam(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              t === team ? "bg-gradient-primary text-primary-foreground shadow-soft" : "glass text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <section>
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">온라인</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
          {list.filter((m) => m.status === "online").map((m) => (
            <div key={m.id} className="flex flex-col items-center gap-1.5 min-w-[60px]">
              <div className="relative">
                <img src={m.avatar} className="w-14 h-14 rounded-full ring-2 ring-primary-glow shadow-soft" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-background" />
              </div>
              <span className="text-[11px] font-medium">{m.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2.5">
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground">전체</h3>
        {list.map((m) => (
          <div key={m.id} className="glass rounded-2xl p-3 flex items-center gap-3">
            <div className="relative">
              <img src={m.avatar} className="w-12 h-12 rounded-2xl object-cover" />
              <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                m.status === "online" ? "bg-emerald-400" : m.status === "away" ? "bg-amber-400" : "bg-muted-foreground"
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{m.name}</p>
              <p className="text-xs text-muted-foreground truncate">{m.role} · {m.team}</p>
            </div>
            <button className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-semibold">
              팔로우
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
