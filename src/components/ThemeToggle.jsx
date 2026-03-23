/**
 * ThemeToggle — sliding pill toggle for light / dark mode
 */
export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center shrink-0 rounded-full cursor-pointer transition-all duration-300"
      style={{
        width: 52, height: 28, padding: 3,
        background: dark ? "#1a0d35" : "#fff7ed",
        border: dark ? "1.5px solid #2d1f4e" : "1.5px solid #fed7aa",
      }}
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] transition-transform duration-300"
        style={{
          background: dark ? "#2d1f4e" : "#fde68a",
          transform: dark ? "translateX(22px)" : "translateX(0px)",
          transition: "transform .35s cubic-bezier(.34,1.2,.64,1)",
        }}
      >
        {dark ? "🌙" : "☀️"}
      </div>
    </button>
  );
}
