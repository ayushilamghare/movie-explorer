import { ALL_GENRES, PILL_COLORS } from "./constants.js";

/**
 * GenreStrip — scrollable horizontal genre filter row
 */
export default function GenreStrip({ genre, onGenre, dark }) {
  const stripBg = dark ? "rgba(15,10,30,.9)" : "rgba(255,252,235,.85)";
  const stripBdr = dark ? "#2d1f4e" : "#fde68a";

  return (
    <div
      className="flex gap-1.5 overflow-x-auto px-7 py-2.5 border-b transition-colors duration-400"
      style={{
        background: stripBg,
        backdropFilter: "blur(14px)",
        borderBottomColor: stripBdr,
      }}
    >
      {ALL_GENRES.map((g, gi) => {
        const pc = PILL_COLORS[gi % PILL_COLORS.length];
        const isActive = genre === g;

        return (
          <button
            key={g}
            onClick={() => onGenre(g)}
            className="whitespace-nowrap text-xs font-outfit rounded-full border-[1.5px] transition-all duration-200 cursor-pointer"
            style={{
              padding: "5px 16px",
              fontWeight: isActive ? 600 : 400,
              backdropFilter: "blur(8px)",
              background: dark
                ? (isActive ? "linear-gradient(135deg,#2d1f4e,#4c1d95)" : "rgba(19,13,36,.8)")
                : (isActive ? pc.activeBg : pc.bg),
              borderColor: dark
                ? (isActive ? "transparent" : "#2d1f4e")
                : (isActive ? "transparent" : pc.border),
              color: dark
                ? (isActive ? "#e2d9f3" : "#a78bfa")
                : (isActive ? "#fff" : pc.color),
              boxShadow: isActive
                ? (dark ? "0 4px 14px rgba(124,58,237,.3)" : `0 4px 14px ${pc.activeShadow}`)
                : "none",
            }}
          >
            {g}
          </button>
        );
      })}
    </div>
  );
}
