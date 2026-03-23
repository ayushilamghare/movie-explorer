/**
 * FilterBar — Year and Min Rating dropdowns
 * Tailwind-first, with dynamic colors for dark/light
 */
export default function FilterBar({ dark, year, onYear, minRating, onMinRating }) {
    const years = ["All", ...Array.from({ length: 36 }, (_, i) => 2025 - i)];
    const ratings = [
        { label: "Any Rating", value: 0 },
        { label: "★ 1+", value: 1 },
        { label: "★ 2+", value: 2 },
        { label: "★ 3+", value: 3 },
        { label: "★ 4+", value: 4 },
        { label: "★ 5", value: 5 },
    ];

    const selectClass = `
    appearance-none cursor-pointer rounded-xl px-3 py-2 text-xs font-semibold
    border-[1.5px] outline-none font-outfit transition-all duration-200
    focus:ring-2
    ${dark
            ? "bg-[#130d24] border-[#2d1f4e] text-[#a78bfa] focus:ring-violet-900 focus:border-[#7c3aed]"
            : "bg-white/80 border-pink-200 text-pink-800 focus:ring-pink-200 focus:border-pink-400"
        }
  `;

    const labelClass = `text-[10px] font-semibold uppercase tracking-widest mb-1 ${dark ? "text-[#4c1d95]" : "text-amber-500"
        }`;

    return (
        <div
            className={`flex gap-6 px-7 py-2.5 border-b transition-colors duration-400 ${dark
                    ? "bg-[rgba(15,10,30,0.9)] border-[#2d1f4e]"
                    : "bg-[rgba(255,252,235,0.85)] border-amber-200"
                }`}
            style={{ backdropFilter: "blur(14px)" }}
        >
            {/* Year */}
            <div className="flex flex-col">
                <span className={labelClass}>Year</span>
                <select
                    className={selectClass}
                    value={year}
                    onChange={e => onYear(e.target.value)}
                >
                    {years.map(y => (
                        <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>
                    ))}
                </select>
            </div>

            {/* Min Rating */}
            <div className="flex flex-col">
                <span className={labelClass}>Min Rating</span>
                <select
                    className={selectClass}
                    value={minRating}
                    onChange={e => onMinRating(Number(e.target.value))}
                >
                    {ratings.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}
