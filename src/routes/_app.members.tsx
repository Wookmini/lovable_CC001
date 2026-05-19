import { createFileRoute } from "@tanstack/react-router";
import { Search, UserPlus, Bell, Check, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export const Route = createFileRoute("/_app/members")({
  head: () => ({ meta: [{ title: "회원 및 동호회 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Members,
});

function Members() {
  const { 
    members, clubs, currentUser, currentUserNotifications, 
    requestJoinClub, approveJoinRequest, rejectJoinRequest, dismissNotification 
  } = useAppContext();

  const [team, setTeam] = useState("전체");
  const [activeTab, setActiveTab] = useState<"members" | "clubs">("members");

  const teams = ["전체", ...clubs.map(c => c.name)];
  const list = team === "전체" ? members : members.filter((m) => m.clubs.includes(team));

  return (
    <div className="px-5 sm:px-8 pt-2 sm:pt-6 space-y-4 sm:space-y-6 pb-24 h-full overflow-y-auto">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">네트워크</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{members.length}명의 동호회원, {clubs.length}개의 동호회</p>
        </div>
      </header>

      {/* 가입 요청 알림 영역 (회장용) */}
      {currentUserNotifications.length > 0 && (
        <section className="bg-primary/10 rounded-2xl p-4 border border-primary/20 space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2 text-primary">
            <Bell className="w-4 h-4" /> 알림 ({currentUserNotifications.length})
          </h3>
          <div className="space-y-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:space-y-0">
            {currentUserNotifications.map(noti => (
              <div key={noti.id} className="bg-white/60 dark:bg-black/40 backdrop-blur-md p-3 rounded-xl flex items-center justify-between shadow-sm">
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-xs font-medium text-foreground truncate">
                    {noti.type === 'join_request' 
                      ? <><span className="font-bold">{noti.fromUserName}</span>님이 <span className="text-primary font-bold">{noti.clubName}</span>에 가입을 신청했습니다.</>
                      : noti.type === 'join_result' 
                        ? <><span className="font-bold">{noti.clubName}</span> 가입이 <span className={noti.status === 'approved' ? 'text-emerald-500' : 'text-red-500'}>{noti.status === 'approved' ? '승인' : '거절'}</span>되었습니다.</>
                        : ''}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{noti.time}</p>
                </div>
                {noti.type === 'join_request' && noti.status === 'pending' ? (
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button onClick={() => approveJoinRequest(noti.id)} className="w-7 h-7 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => rejectJoinRequest(noti.id)} className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => dismissNotification(noti.id)} className="text-[10px] text-muted-foreground hover:text-foreground">확인</button>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 탭 전환 */}
      <div className="flex p-1 bg-secondary rounded-full">
        <button 
          onClick={() => setActiveTab("members")} 
          className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${activeTab === "members" ? "bg-white dark:bg-slate-800 shadow text-foreground" : "text-muted-foreground"}`}
        >
          멤버
        </button>
        <button 
          onClick={() => setActiveTab("clubs")} 
          className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${activeTab === "clubs" ? "bg-white dark:bg-slate-800 shadow text-foreground" : "text-muted-foreground"}`}
        >
          동호회 가입
        </button>
      </div>

      {activeTab === "members" ? (
        <>
          <label className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input className="flex-1 bg-transparent outline-none text-sm" placeholder="이름 또는 부서 검색" />
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
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground">목록 ({list.length})</h3>
            {list.map((m) => (
              <div key={m.id} className="glass rounded-2xl p-3 flex items-center gap-3">
                <div className="relative">
                  <img src={m.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                    m.status === "online" ? "bg-emerald-400" : m.status === "away" ? "bg-amber-400" : "bg-muted-foreground"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{m.name} {m.id === currentUser.id && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded ml-1">나</span>}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.dept} · {m.clubs.join(', ')}</p>
                </div>
              </div>
            ))}
          </section>
        </>
      ) : (
        <section className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">모든 동호회</h3>
          {clubs.map((c) => {
            const isMember = currentUser.clubs.includes(c.name);
            const president = members.find(m => m.id === c.presidentId);
            return (
              <div key={c.name} className="glass rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-foreground text-base truncate">{c.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">회장: {president?.name || '미정'}</p>
                </div>
                {isMember ? (
                  <span className="text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-full">
                    가입됨
                  </span>
                ) : (
                  <button 
                    onClick={() => requestJoinClub(c.name)}
                    className="text-xs font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:opacity-90 transition active:scale-95"
                  >
                    가입 신청
                  </button>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
