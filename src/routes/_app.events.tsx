import { createFileRoute } from "@tanstack/react-router";
import { events } from "@/lib/mock-data";
import { Plus, MapPin, Clock, MessageCircle, Heart, Lock } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

export const Route = createFileRoute("/_app/events")({
  head: () => ({ meta: [{ title: "커뮤니티 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: CommunityBoard,
});

const categories = ["전체보기", "회원 게시판", "활동보고서", "행사 승인신청서"];

function CommunityBoard() {
  const { posts, clubs, currentUser, toggleLike } = useAppContext();
  
  const [activeMainTab, setActiveMainTab] = useState<"board" | "events">("board");
  const [selectedClub, setSelectedClub] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체보기");

  const clubList = ["전체", ...clubs.map(c => c.name)];

  // 게시판 필터링 로직
  const filteredPosts = posts.filter(post => {
    const passClub = selectedClub === "전체" || post.club === selectedClub;
    const passCategory = selectedCategory === "전체보기" || post.category === selectedCategory;
    
    // 권한 필터: '회원 게시판'은 해당 동호회 가입자 또는 관리자만 열람 가능
    let passAuth = true;
    if (post.category === "회원 게시판" && currentUser.role !== "admin") {
      if (!currentUser.clubs.includes(post.club)) {
        passAuth = false;
      }
    }
    
    return passClub && passCategory && passAuth;
  });

  return (
    <div className="px-5 sm:px-8 pt-2 sm:pt-6 space-y-4 sm:space-y-6 pb-24 h-full overflow-y-auto">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">DB글로벌칩 네트워크</p>
          <h1 className="text-2xl font-bold mt-0.5">커뮤니티</h1>
        </div>
        <button className="w-10 h-10 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
          <Plus className="w-4 h-4" />
        </button>
      </header>

      {/* 메인 탭 전환 */}
      <div className="flex p-1 bg-secondary rounded-full">
        <button 
          onClick={() => setActiveMainTab("board")} 
          className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${activeMainTab === "board" ? "bg-white dark:bg-slate-800 shadow text-foreground" : "text-muted-foreground"}`}
        >
          게시판
        </button>
        <button 
          onClick={() => setActiveMainTab("events")} 
          className={`flex-1 py-2 text-sm font-semibold rounded-full transition ${activeMainTab === "events" ? "bg-white dark:bg-slate-800 shadow text-foreground" : "text-muted-foreground"}`}
        >
          오프라인 일정
        </button>
      </div>

      {activeMainTab === "board" ? (
        <div className="space-y-4">
          {/* 1Depth: 동호회 필터 */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
            {clubList.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedClub(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  c === selectedClub ? "bg-gradient-primary text-primary-foreground shadow-soft" : "glass text-muted-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* 2Depth: 카테고리 필터 */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition ${
                  cat === selectedCategory ? "bg-foreground text-background" : "glass text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <section className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm sm:col-span-full">
                게시물이 없습니다.
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="glass rounded-3xl p-4 shadow-card">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {post.club} &gt; {post.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{post.time}</span>
                  </div>
                  
                  <h3 className="font-bold text-[15px] leading-tight mb-1">{post.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.content}</p>
                  
                  {/* 예산 내역 및 블라인드 처리 */}
                  {post.budget && (
                    <div className="mb-3 p-3 rounded-xl bg-secondary/50 border border-border">
                      <p className="text-[10px] font-bold text-muted-foreground mb-1 flex items-center gap-1">
                        예산 내역 {currentUser.role !== 'admin' && <Lock className="w-3 h-3 text-amber-500" />}
                      </p>
                      {currentUser.role === 'admin' ? (
                        <p className="text-xs text-foreground whitespace-pre-wrap font-mono">{post.budget}</p>
                      ) : (
                        <div className="filter blur-[4px] select-none text-xs opacity-50">
                          구장 대관료: 120,000원<br/>
                          음료 및 간식: 35,000원<br/>
                          총 155,000원 지출
                        </div>
                      )}
                      {currentUser.role !== 'admin' && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                          보안 정책에 따라 관리자(인사팀)만 열람 가능합니다.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-border/60 pt-3">
                    <span className="text-[11px] font-medium text-foreground">작성자: {post.author}</span>
                    <div className="flex gap-3 text-muted-foreground">
                      <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 text-[11px] hover:text-rose-500 transition">
                        <Heart className="w-3.5 h-3.5" /> {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-[11px]">
                        <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      ) : (
        <section className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {events.map((e) => (
            <div key={e.id} className="glass rounded-3xl p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className={`w-14 h-16 rounded-2xl bg-gradient-to-br ${e.color} grid place-items-center shadow-soft`}>
                  <div className="text-center leading-tight">
                    <p className="text-[10px] font-bold opacity-70 text-black">{e.date.split(" ")[0]}</p>
                    <p className="text-xl font-bold text-black">{e.date.split(" ")[1].replace("일", "")}</p>
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
                <span className="text-[11px] text-muted-foreground">{e.attendees}명 참여 예정</span>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground">
                  RSVP
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
