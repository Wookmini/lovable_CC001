import { createFileRoute } from "@tanstack/react-router";
import { gallery } from "@/lib/mock-data";
import { Heart, MessageCircle, Plus } from "lucide-react";

export const Route = createFileRoute("/_app/gallery")({
  head: () => ({ meta: [{ title: "갤러리 — DB글로벌칩 동호회 커뮤니티" }] }),
  component: Gallery,
});

function Gallery() {
  const colA = gallery.filter((_, i) => i % 2 === 0);
  const colB = gallery.filter((_, i) => i % 2 === 1);
  return (
    <div className="px-5 pt-2 space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">갤러리</h1>
          <p className="text-xs text-muted-foreground mt-0.5">함께한 순간들</p>
        </div>
        <button className="w-10 h-10 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-soft">
          <Plus className="w-4 h-4" />
        </button>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
        {["전체", "러닝", "등산", "독서", "사진", "요가"].map((t, i) => (
          <button
            key={t}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
              i === 0 ? "bg-gradient-primary text-primary-foreground shadow-soft" : "glass text-muted-foreground"
            }`}
          >
            #{t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {[colA, colB].map((col, ci) => (
          <div key={ci} className="space-y-2.5">
            {col.map((g) => (
              <div key={g.id} className="relative rounded-2xl overflow-hidden shadow-card group">
                <img src={g.url} style={{ height: g.h }} className="w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <p className="text-[11px] font-semibold">{g.by}</p>
                  <div className="flex items-center gap-3 mt-0.5 text-[10px]">
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3 fill-white" /> {g.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {Math.floor(g.likes / 4)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
