import ThemeToggle from "./ThemeToggle.jsx";

/**
 * Navbar — sticky top bar with animated orbs, logo, search, theme toggle
 */
export default function Navbar({ dark, scrolled, search, onSearch, onToggleTheme }) {
  const navBg = dark
    ? (scrolled ? "rgba(15,10,30,.97)" : "rgba(15,10,30,.82)")
    : (scrolled ? "rgba(255,253,247,.96)" : "rgba(255,253,247,.75)");
  const navBdr = dark ? "#2d1f4e" : "#fde68a";
  const navShadow = dark
    ? "0 4px 28px rgba(124,58,237,.12)"
    : "0 4px 20px rgba(251,191,36,.12)";
  const iconColor = dark ? "#a78bfa" : "#f97316";
  const iconBg = dark ? "#1a0d35" : "#fff7ed";
  const iconBorder = dark ? "#2d1f4e" : "#fed7aa";
  const titleColor = dark ? "#e2d9f3" : "#7c2d12";
  const subColor = dark ? "#4c1d95" : "#f9a8d4";
  const searchBg = dark ? "rgba(19,13,36,.9)" : "rgba(255,255,255,.85)";
  const searchBdr = dark ? "#2d1f4e" : "#fbcfe8";
  const searchClr = dark ? "#a78bfa" : "#831843";
  const searchPh = dark ? "#4c1d95" : "#f9a8d4";
  const focusBdr = dark ? "#7c3aed" : "#ec4899";
  const focusGlow = dark ? "rgba(124,58,237,.15)" : "rgba(236,72,153,.15)";

  return (
    <nav
      className="sticky top-0 z-[100] h-16 flex items-center justify-between overflow-hidden px-4 sm:px-7 gap-3 sm:gap-4.5"
      style={{
        background: navBg,
        backdropFilter: "blur(22px)",
        borderBottom: `1px solid ${scrolled ? navBdr : "transparent"}`,
        boxShadow: scrolled ? navShadow : "none",
        transition: "all .35s ease",
        animation: "navReveal .5s ease both",
      }}
    >
      {/* ── Floating ambient orbs ── */}
      {dark ? (
        <>
          <Orb w={130} h={130} color="rgba(124,58,237,.1)" top={-50} left={50} anim="float1 4s ease-in-out infinite" />
          <Orb w={90} h={90} color="rgba(167,139,250,.08)" bottom={-40} right={200} anim="float2 5s ease-in-out infinite" />
          <Orb w={70} h={70} color="rgba(109,40,217,.09)" top={-20} right={120} anim="float1 3.5s ease-in-out infinite 1s" />
          <Orb w={55} h={55} color="rgba(139,92,246,.08)" bottom={-15} left="35%" anim="float3 6s ease-in-out infinite .5s" />
        </>
      ) : (
        <>
          <Orb w={120} h={120} color="rgba(253,224,71,.45)" top={-45} left={55} anim="float1 4s ease-in-out infinite" />
          <Orb w={80} h={80} color="rgba(251,146,60,.38)" bottom={-35} left={200} anim="float2 5s ease-in-out infinite .5s" />
          <Orb w={100} h={100} color="rgba(244,114,182,.38)" top={-30} right={160} anim="float1 3.5s ease-in-out infinite 1s" />
          <Orb w={70} h={70} color="rgba(147,197,253,.45)" bottom={-20} right={320} anim="float3 6s ease-in-out infinite" />
          <Orb w={65} h={65} color="rgba(134,239,172,.42)" top={-10} left="45%" anim="float2 4.5s ease-in-out infinite 2s" />
        </>
      )}

      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 relative z-10">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          style={{ background: iconBg, border: `1.5px solid ${iconBorder}` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke={iconColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5">
            <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z" />
            <path d="m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.32l.87 2.87L4 11Z" />
            <line x1="6.6" y1="4.99" x2="11" y2="11" />
            <line x1="11.86" y1="3.29" x2="16.27" y2="9.3" />
          </svg>
        </div>
        <div className="leading-none hidden sm:block">
          <div
            className="font-lora text-lg sm:text-xl font-bold transition-colors duration-300"
            style={{ color: titleColor }}
          >
            Movie Explorer
          </div>
          <div
            className="text-[8px] tracking-[.26em] uppercase mt-0.5"
            style={{ color: subColor }}
          >
            Film Reviews
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <div className="relative flex-1 max-w-[140px] sm:max-w-xs z-10 transition-all duration-300">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke={searchPh} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
          className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none sm:w-[13px] sm:h-[13px]">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search…"
          className="w-full rounded-lg sm:rounded-xl text-[12px] sm:text-[13px] font-outfit transition-all duration-200 outline-none"
          style={{
            background: searchBg,
            border: `1.5px solid ${searchBdr}`,
            color: searchClr,
            padding: "7px 10px 7px 28px",
            backdropFilter: "blur(8px)",
          }}
          onFocus={e => {
            e.target.style.borderColor = focusBdr;
            e.target.style.boxShadow = `0 0 0 3px ${focusGlow}`;
            if (window.innerWidth < 640) {
              e.target.parentElement.style.maxWidth = "200px";
            }
          }}
          onBlur={e => {
            e.target.style.borderColor = searchBdr;
            e.target.style.boxShadow = "none";
            if (window.innerWidth < 640) {
              e.target.parentElement.style.maxWidth = "140px";
            }
          }}
        />
      </div>

      {/* ── Theme toggle ── */}
      <div className="shrink-0">
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />
      </div>
    </nav>
  );
}

/** Small helper for the ambient background orbs */
function Orb({ w, h, color, top, bottom, left, right, anim }) {
  return (
    <div style={{
      position: "absolute",
      width: w, height: h,
      borderRadius: "50%",
      background: `radial-gradient(circle,${color},transparent 70%)`,
      top, bottom, left, right,
      animation: anim,
      pointerEvents: "none",
    }} />
  );
}
