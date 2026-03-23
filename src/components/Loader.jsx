import "../styles/Loader.css";

/**
 * Loader — spinning circle with orbiting dot and "Loading" label
 */
export default function Loader({ dark }) {
  const arc = dark ? "#7c3aed" : "#f97316";
  const ring = dark ? "#2d1f4e" : "#fde68a";
  const dot = dark ? "#a78bfa" : "#ec4899";
  const glow = dark ? "rgba(167,139,250,.4)" : "rgba(236,72,153,.5)";
  const label = dark ? "#a78bfa" : "#be185d";

  return (
    <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
      <div className="loader-spin">
        <div
          className="loader-arc"
          style={{
            borderColor: ring,
            borderTopColor: arc,
            borderRightColor: arc,
          }}
        />
        <div className="loader-arm">
          <div
            className="loader-dot"
            style={{
              background: dot,
              boxShadow: `0 0 12px ${dot}, 0 0 24px ${glow}`,
            }}
          />
        </div>
        <div className="loader-label" style={{ color: label }}>
          Loading
        </div>
      </div>
    </div>
  );
}
