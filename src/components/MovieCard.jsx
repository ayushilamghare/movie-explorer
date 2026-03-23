import Stars from "./Stars.jsx";
import { CARD_PALETTES, GENRE_MAP, IMG_URL } from "./constants.js";
import "../styles/MovieCard.css";

/**
 * MovieCard — 3D flip card
 * Front: poster + rating badge
 * Back: genre, title, overview, stars, "View Details" button
 */
export default function MovieCard({ movie, index, avg, dark, onOpen }) {
  const cp = dark ? null : CARD_PALETTES[index % CARD_PALETTES.length];
  const cardBg = dark ? "#130d24" : cp.bg;
  const cardBdr = dark ? "#2d1f4e" : cp.border;
  const cardAcc = dark ? "#7c3aed" : cp.accent;
  const cardTxt = dark ? "#e2d9f3" : cp.text;
  const cardMut = dark ? "#a78bfa" : cp.muted;
  const badgeBg = dark ? "rgba(15,10,30,.9)" : "rgba(255,255,255,.9)";
  const starFill = dark ? "#f59e0b" : cp.accent;
  const starStroke = dark ? "#fcd34d" : cp.border;
  const genreLabel = GENRE_MAP[movie.genre_ids?.[0]] || "";

  return (
    <div
      className="flip-wrap card-appear"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.6)}s` }}
    >
      <div className="flip-inner">

        {/* ── FRONT: poster only ── */}
        <div className="flip-front">
          <img
            src={`${IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
            onError={e => e.target.style.opacity = ".2"}
          />
          {/* Rating badge */}
          <div
            className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-lg px-2 py-0.5"
            style={{
              background: badgeBg,
              backdropFilter: "blur(8px)",
              border: `1px solid ${cardBdr}`,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill={starFill} stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="font-mono text-[10.5px] font-semibold" style={{ color: cardAcc }}>
              {avg.toFixed(1)}
            </span>
          </div>
        </div>

        {/* ── BACK: details ── */}
        <div className="flip-back" style={{ background: cardBg, border: `1.5px solid ${cardBdr}` }}>
          {/* Faint poster echo */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 16,
            background: `url(${IMG_URL}${movie.poster_path}) center/cover`,
            opacity: .07,
          }} />
          <div className="relative z-10">
            {genreLabel && (
              <span className="text-[9.5px] font-semibold uppercase tracking-[.12em]" style={{ color: cardAcc }}>
                {genreLabel}
              </span>
            )}
            <div
              className="font-lora text-[14.5px] font-bold leading-tight mt-0.5 mb-1.5"
              style={{ color: cardTxt }}
            >
              {movie.title}
            </div>
            <p
              className="text-[11px] leading-relaxed mb-2 overflow-hidden"
              style={{
                color: cardMut,
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {movie.overview}
            </p>
            <div className="flex items-center justify-between mb-0.5">
              <Stars value={avg} size={12} fillColor={starFill} strokeColor={starStroke} />
              <span className="font-mono text-[10.5px]" style={{ color: cardMut }}>
                {movie.release_date?.slice(0, 4)}
              </span>
            </div>
            <button
              onClick={() => onOpen(movie)}
              className="mt-2.5 w-full py-2 rounded-[10px] text-white text-xs font-semibold tracking-wider border-none cursor-pointer transition-all duration-200"
              style={{
                background: dark
                  ? "linear-gradient(135deg,#2d1f4e,#4c1d95)"
                  : `linear-gradient(135deg,${cp.accent},${cp.muted})`,
                boxShadow: dark
                  ? "0 4px 12px rgba(124,58,237,.25)"
                  : `0 4px 12px ${cp.accent}55`,
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              View Details &amp; Rate ✦
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
