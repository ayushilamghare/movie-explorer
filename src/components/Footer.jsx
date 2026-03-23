/**
 * Footer — professional multi-column footer
 */
export default function Footer({ dark }) {
    const bg = dark ? "rgba(15,10,30,0.95)" : "rgba(255,252,240,0.95)";
    const border = dark ? "#2d1f4e" : "#fde68a";
    const heading = dark ? "#e2d9f3" : "#1c1917";
    const body = dark ? "#a78bfa" : "#78350f";
    const muted = dark ? "#4c1d95" : "#d97706";
    const accent = dark ? "#7c3aed" : "#ec4899";

    const links = {
        Discover: ["Popular", "Top Rated", "New Releases", "Trending"],
        Genres: ["Action", "Drama", "Sci-Fi", "Thriller"],
        Account: ["My Ratings", "Watchlist", "History", "Settings"],
    };

    return (
        <footer
            className="w-full mt-4 border-t"
            style={{ background: bg, borderTopColor: border, backdropFilter: "blur(14px)" }}
        >
            <div className="max-w-6xl mx-auto px-8 py-10">

                {/* Top row — brand + link columns */}
                <div className="flex flex-wrap gap-10 justify-between">

                    {/* Brand */}
                    <div className="flex flex-col gap-3 max-w-[200px]">
                        <div className="flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z" />
                                <path d="m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.32l.87 2.87L4 11Z" />
                                <line x1="6.6" y1="4.99" x2="11" y2="11" />
                                <line x1="11.86" y1="3.29" x2="16.27" y2="9.3" />
                            </svg>
                            <span className="font-lora font-bold text-base" style={{ color: heading }}>
                                Movie Explorer
                            </span>
                        </div>
                        <p className="text-[11px] leading-relaxed" style={{ color: body }}>
                            Discover, review, and rate your favourite films. Powered by community taste.
                        </p>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([section, items]) => (
                        <div key={section} className="flex flex-col gap-2">
                            <div className="text-[9px] font-bold uppercase tracking-[.2em] mb-1" style={{ color: muted }}>
                                {section}
                            </div>
                            {items.map(item => (
                                <span
                                    key={item}
                                    className="text-[12px] cursor-default transition-colors duration-150"
                                    style={{ color: body }}
                                    onMouseEnter={e => e.currentTarget.style.color = accent}
                                    onMouseLeave={e => e.currentTarget.style.color = body}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="my-7 h-px opacity-50" style={{ background: border }} />

                {/* Bottom row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[11px]" style={{ color: muted }}>
                        © {new Date().getFullYear()} Movie Explorer. All rights reserved.
                    </span>
                    <span className="text-[11px]" style={{ color: muted }}>
                        Your personal film discovery platform
                    </span>
                </div>

            </div>
        </footer>
    );
}
