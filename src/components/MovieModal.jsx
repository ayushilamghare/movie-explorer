import { useEffect } from "react";
import Stars from "./Stars.jsx";
import { GENRE_MAP, IMG_URL, BG_URL, PILL_COLORS } from "./constants.js";

/**
 * MovieModal — backdrop hero, full details, cast, TMDB score, user rating
 */
export default function MovieModal({ movie, detail, detLoad, onClose, myRating, onRate, avgRating, dark }) {
  // Close on Escape, lock body scroll
  useEffect(() => {
    const esc = e => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const genres = detail?.genres
    || (movie.genre_ids || []).slice(0, 3).map(id => ({ id, name: GENRE_MAP[id] || "" }));

  // Colors – dark mode now uses rich violet palette
  const modalBg = dark ? "#0f0a1e" : "#fff9fe";
  const modalBdr = dark ? "#2d1f4e" : "#fbcfe8";
  const titleColor = dark ? "#e2d9f3" : "#831843";
  const overColor = dark ? "#a78bfa" : "#9d174d";
  const castBg = dark ? "#130d24" : "";
  const castBdr = dark ? "#2d1f4e" : "";
  const rateBg = dark ? "#130d24" : "#eff6ff";
  const rateBdr = dark ? "#2d1f4e" : "#bfdbfe";
  const rateLbl = dark ? "#7c3aed" : "#1d4ed8";
  const badgeBg = dark ? "rgba(15,10,30,.9)" : "rgba(255,255,255,.92)";
  const glow = dark ? "rgba(124,58,237,.2)" : "rgba(236,72,153,.2)";
  const gradientTo = dark ? modalBg : "#fff9fe";

  const scoreBoxes = [
    {
      label: "Critic Score", val: (movie.vote_average / 2).toFixed(1),
      starsVal: movie.vote_average / 2,
      sub: movie.vote_count > 0 ? `(${movie.vote_count.toLocaleString()})` : null,
      bg: dark ? "#130d24" : "#fffbeb", bdr: dark ? "#2d1f4e" : "#fde68a",
      lc: dark ? "#7c3aed" : "#d97706", vc: dark ? "#f59e0b" : "#f59e0b",
      sf: dark ? "#f59e0b" : "#f59e0b", ss: dark ? "#fcd34d" : "#fcd34d",
    },
    {
      label: "Avg Rating", val: avgRating.toFixed(1),
      starsVal: avgRating, sub: null,
      bg: dark ? "#130d24" : "#f0fdf4", bdr: dark ? "#2d1f4e" : "#bbf7d0",
      lc: dark ? "#7c3aed" : "#15803d", vc: dark ? "#f59e0b" : "#22c55e",
      sf: dark ? "#f59e0b" : "#22c55e", ss: dark ? "#fcd34d" : "#86efac",
    },
  ];

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[1000] flex justify-center items-start overflow-y-auto p-4 sm:p-8 py-10 sm:py-16"
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(18px)",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        className="w-full flex flex-col relative"
        style={{
          maxWidth: 720,
          background: modalBg,
          borderRadius: 24,
          border: `1px solid ${modalBdr}`,
          boxShadow: `0 24px 80px ${glow}`,
          animation: "slideUp .4s cubic-bezier(.34,1.5,.64,1)",
        }}
      >
        {/* Backdrop hero */}
        {(detail?.backdrop_path || movie.backdrop_path) && (
          <div className="relative overflow-hidden shrink-0 rounded-t-[23px]" style={{ height: 210 }}>
            <img
              src={`${BG_URL}${detail?.backdrop_path || movie.backdrop_path}`}
              className="w-full h-full object-cover block"
              alt=""
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom,transparent 10%,${gradientTo} 100%)` }} />
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[100] w-8 h-8 rounded-full flex items-center justify-center text-[15px] cursor-pointer transition-transform duration-200"
          style={{
            background: badgeBg,
            border: `1px solid ${modalBdr}`,
            color: dark ? "#a78bfa" : "#be185d",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >✕</button>

        {/* Modal body (no internal scroll for cleaner mobile experience) */}
        <div className="px-6 pb-8">

          {/* Poster + title row */}
          <div className="flex gap-5 relative z-10" style={{ marginTop: -50 }}>
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-2xl shrink-0 self-end border-[3px] border-white/5"
              style={{ width: 110, boxShadow: `0 12px 32px ${glow}` }}
            />
            <div className="self-end pb-1 pr-6">
              <h2
                className="font-lora text-2xl font-bold leading-tight mb-1.5"
                style={{ color: titleColor }}
              >
                {movie.title}
              </h2>
              <div className="flex gap-1.5 flex-wrap items-center">
                <span className="text-xs font-mono" style={{ color: dark ? "#a78bfa" : "#db2777" }}>
                  {movie.release_date?.slice(0, 4)}
                </span>
                {detail?.runtime > 0 && (
                  <span className="text-xs font-mono" style={{ color: dark ? "#7c3aed" : "#be185d" }}>
                    · {Math.floor(detail.runtime / 60)}h {detail.runtime % 60}m
                  </span>
                )}
                <div className="flex gap-1.5 flex-wrap mt-0.5">
                  {genres.filter(g => g.name).map((g, gi) => {
                    const pc = PILL_COLORS[gi % PILL_COLORS.length];
                    return dark
                      ? <span key={g.id} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium" style={{ background: "#130d24", color: "#a78bfa", border: "1px solid #2d1f4e" }}>{g.name}</span>
                      : <span key={g.id} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium" style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}>{g.name}</span>;
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="my-5 opacity-40 mx-[-24px]" style={{ height: 1, background: modalBdr }} />

          {/* Loading skeleton */}
          {detLoad ? (
            <div className="flex flex-col gap-2.5">
              {[320, 260, 200, 140].map((w, i) => (
                <div key={i} style={{
                  height: 12, width: w, borderRadius: 6,
                  background: dark
                    ? "linear-gradient(90deg,#130d24 25%,#1a0d35 50%,#130d24 75%)"
                    : "linear-gradient(90deg,#fce7f3 25%,#fbcfe8 50%,#fce7f3 75%)",
                  backgroundSize: "200% 100%",
                  animation: "sk 1.5s infinite",
                }} />
              ))}
            </div>
          ) : (
            <>
              {/* Overview */}
              <p className="text-[14px] leading-7 mb-6" style={{ color: overColor }}>
                {detail?.overview || movie.overview || "No overview available."}
              </p>

              {/* Score boxes */}
              <div className="flex gap-3.5 mb-6 flex-wrap">
                {scoreBoxes.map((box, bi) => (
                  <div
                    key={bi}
                    className="rounded-xl px-4 py-3 flex-1 min-w-[140px]"
                    style={{ background: box.bg, border: `1px solid ${box.bdr}`, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
                  >
                    <div className="text-[9px] tracking-[.16em] uppercase mb-1.5 font-semibold" style={{ color: box.lc }}>{box.label}</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Stars value={box.starsVal} size={15} fillColor={box.sf} strokeColor={box.ss} />
                      <span className="font-mono text-sm font-bold" style={{ color: box.vc }}>{box.val}</span>
                      {box.sub && <span className="font-mono text-[10px]" style={{ color: box.lc }}>{box.sub}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cast */}
              {detail?.cast?.length > 0 && (
                <div className="mb-6">
                  <div className="text-[9px] tracking-[.16em] uppercase mb-2.5 font-semibold" style={{ color: dark ? "#a78bfa" : "#be185d" }}>Cast</div>
                  <div className="flex gap-2.5 flex-wrap">
                    {detail.cast.map((c, ci) => {
                      const pc = PILL_COLORS[ci % PILL_COLORS.length];
                      return (
                        <div
                          key={c.id}
                          className="flex items-center gap-1.5 rounded-full"
                          style={{
                            padding: "4px 10px 4px 4px",
                            background: dark ? castBg : pc.bg,
                            border: dark ? `1px solid ${castBdr}` : `1px solid ${pc.border}`,
                          }}
                        >
                          <div style={{
                            width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                            background: c.profile_path
                              ? `url(https://image.tmdb.org/t/p/w185${c.profile_path}) center/cover`
                              : dark ? "#130d24" : pc.bg,
                            border: dark ? "2px solid #2d1f4e" : `2px solid ${pc.border}`,
                          }} />
                          <span className="text-[11.5px] font-medium" style={{ color: dark ? "#a78bfa" : pc.color }}>{c.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rate */}
              <div className="rounded-2xl px-5 py-5" style={{ background: rateBg, border: `1px solid ${rateBdr}`, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                <div className="text-[9px] tracking-[.16em] uppercase mb-3 font-semibold" style={{ color: rateLbl }}>
                  {myRating ? "Your Rating" : "Rate This Film"}
                </div>
                {myRating ? (
                  <div className="flex items-center gap-3 flex-wrap">
                    <Stars value={myRating} size={22} fillColor={dark ? "#f59e0b" : "#3b82f6"} strokeColor={dark ? "#fcd34d" : "#93c5fd"} />
                    <span className="text-[14px] font-medium" style={{ color: dark ? "#a78bfa" : "#1d4ed8" }}>
                      You rated it {myRating}/5 ✨
                    </span>
                  </div>
                ) : (
                  <Stars value={0} interactive size={28} onRate={onRate} fillColor={dark ? "#f59e0b" : "#3b82f6"} strokeColor={dark ? "#fcd34d" : "#93c5fd"} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
