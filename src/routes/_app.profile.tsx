import { createFileRoute, Link } from "@tanstack/react-router";
import { profile } from "@/lib/mock-data";
import { Settings, Edit3, Share2 } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "프로필 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-4">
      <div className="relative h-44">
        <img src={profile.cover} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="w-9 h-9 grid place-items-center rounded-full glass">
            <Share2 className="w-4 h-4" />
          </button>
          <Link to="/settings" className="w-9 h-9 grid place-items-center rounded-full glass">
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="px-5 -mt-16 relative">
        <div className="flex items-end justify-between mb-3">
          <img src={profile.avatar} className="w-24 h-24 rounded-3xl ring-4 ring-background shadow-glow object-cover" />
          <button className="bg-gradient-primary text-primary-foreground rounded-full px-4 py-2 text-xs font-semibold shadow-soft flex items-center gap-1.5">
            <Edit3 className="w-3 h-3" /> 편집
          </button>
        </div>
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-xs text-muted-foreground">{profile.handle} · {profile.role}</p>
        <p className="text-sm mt-2 leading-relaxed">{profile.bio}</p>

        <div className="glass rounded-3xl p-4 mt-4 grid grid-cols-3 divide-x divide-border/60">
          <div className="text-center">
            <p className="text-xl font-bold">{profile.stats.events}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">참여 모임</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{profile.stats.posts}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">게시물</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{profile.stats.friends}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">동료</p>
          </div>
        </div>

        <section className="mt-5">
          <h3 className="font-heading font-bold mb-2.5">획득한 배지</h3>
          <div className="flex flex-wrap gap-2">
            {profile.badges.map((b) => (
              <span key={b} className="glass rounded-full px-3 py-1.5 text-xs font-semibold">{b}</span>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <h3 className="font-heading font-bold mb-2.5">내 동호회</h3>
          <div className="space-y-2">
            {[
              { name: "러닝 크루", role: "회장", color: "from-emerald-200 to-teal-100" },
              { name: "독서 모임", role: "회원", color: "from-amber-100 to-orange-100" },
              { name: "사진반", role: "회원", color: "from-rose-100 to-amber-100" },
            ].map((c) => (
              <div key={c.name} className="glass rounded-2xl p-3 flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${c.color} shadow-soft`} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.role}</p>
                </div>
                <button className="text-xs text-primary font-semibold">열기</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
