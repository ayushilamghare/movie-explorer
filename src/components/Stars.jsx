import { useState } from "react";

/**
 * Stars — reusable star rating display / input
 *
 * Props:
 *   value       number  0–5 (supports decimals for display)
 *   interactive boolean enables hover + click
 *   onRate      fn(stars) called when user clicks a star
 *   size        px size of each star icon
 *   fillColor   filled star color
 *   strokeColor empty star stroke color
 */
export default function Stars({
  value = 0,
  interactive = false,
  onRate,
  size = 14,
  fillColor = "#f59e0b",
  strokeColor = "#fcd34d",
}) {
  const [hover, setHover] = useState(0);
  const display = hover || value;

  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <svg
          key={s}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={s <= Math.round(display) ? fillColor : "none"}
          stroke={s <= Math.round(display) ? fillColor : strokeColor}
          strokeWidth="1.8"
          style={{
            cursor: interactive ? "pointer" : "default",
            transition: "transform .15s, fill .15s",
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            if (interactive) {
              setHover(s);
              e.currentTarget.style.transform = "scale(1.3)";
            }
          }}
          onMouseLeave={e => {
            if (interactive) {
              setHover(0);
              e.currentTarget.style.transform = "scale(1)";
            }
          }}
          onClick={() => interactive && onRate && onRate(s)}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}
