// ─── API ────────────────────────────────────────────────────
export const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjY1YmQxNjc5NjYzYTdlYTEyYWMxNjhkYTg0ZDJlOCIsInN1YiI6IjY0NzZiY2NmMjFhZGQ3MDBhZTkwNjgwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YMigFMjGBxm3bJmm_DkqPp6GNiIkjJqSqORyGn_kMgM";
export const IMG_URL = "https://image.tmdb.org/t/p/w500";
export const BG_URL = "https://image.tmdb.org/t/p/w1280";
export const TMDB_HEADERS = { Authorization: `Bearer ${TMDB_TOKEN}` };

// ─── GENRES ─────────────────────────────────────────────────
export const GENRE_MAP = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 18: "Drama", 10751: "Family", 14: "Fantasy",
  27: "Horror", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  53: "Thriller", 10752: "War",
};

export const ALL_GENRES = [
  "All", "Action", "Adventure", "Animation", "Comedy",
  "Crime", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller",
];

// ─── FALLBACK DATA ───────────────────────────────────────────
export const FALLBACK = [
  { id: 155, title: "The Dark Knight", release_date: "2008-07-18", vote_average: 9.0, vote_count: 30000, genre_ids: [28, 18, 80], poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg", overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and DA Harvey Dent, Batman sets out to dismantle the remaining criminal organizations." },
  { id: 238, title: "The Godfather", release_date: "1972-03-24", vote_average: 8.7, vote_count: 18000, genre_ids: [18, 80], poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg", overview: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son." },
  { id: 278, title: "The Shawshank Redemption", release_date: "1994-09-23", vote_average: 8.7, vote_count: 24000, genre_ids: [18, 80], poster_path: "/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg", backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg", overview: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency." },
  { id: 680, title: "Pulp Fiction", release_date: "1994-10-14", vote_average: 8.5, vote_count: 25000, genre_ids: [53, 80], poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg", overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption." },
  { id: 157336, title: "Interstellar", release_date: "2014-11-07", vote_average: 8.6, vote_count: 32000, genre_ids: [12, 18, 878], poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
  { id: 496243, title: "Parasite", release_date: "2019-05-30", vote_average: 8.5, vote_count: 16000, genre_ids: [18, 35, 53], poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", backdrop_path: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg", overview: "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan." },
  { id: 872585, title: "Oppenheimer", release_date: "2023-07-21", vote_average: 8.4, vote_count: 6000, genre_ids: [18, 36], poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", backdrop_path: "/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg", overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II." },
  { id: 603, title: "The Matrix", release_date: "1999-03-31", vote_average: 8.2, vote_count: 24000, genre_ids: [28, 878], poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg", overview: "A computer hacker learns from mysterious rebels about the true nature of his reality." },
  { id: 550, title: "Fight Club", release_date: "1999-10-15", vote_average: 8.4, vote_count: 26000, genre_ids: [18, 53], poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", backdrop_path: "/87hTDiay2N2qWarMogn8SbAT9dx.jpg", overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy." },
  { id: 13, title: "Forrest Gump", release_date: "1994-07-06", vote_average: 8.5, vote_count: 24000, genre_ids: [18, 10749], poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", backdrop_path: "/7c9UVPPiTPltouxRVY6N9uugaVA.jpg", overview: "A man with a low IQ has accomplished great things in his life and helped to shape several defining events of the 20th century." },
  { id: 299534, title: "Avengers: Endgame", release_date: "2019-04-26", vote_average: 8.4, vote_count: 22000, genre_ids: [12, 28, 878], poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg", backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg", overview: "After the devastating events of Infinity War, the Avengers must assemble once more to undo Thanos's actions." },
  { id: 424, title: "Schindler's List", release_date: "1993-11-30", vote_average: 8.6, vote_count: 14000, genre_ids: [18, 36, 10752], poster_path: "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg", backdrop_path: "/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg", overview: "In German-occupied Poland during WWII, Oskar Schindler gradually becomes concerned for his Jewish workforce." },
];

// ─── CARD COLOR PALETTES (light mode) ───────────────────────
// bg is white/offwhite; only the border carries the color
export const CARD_PALETTES = [
  { bg: "#ffffff", border: "#fde68a", accent: "#f59e0b", text: "#78350f", muted: "#d97706" }, // yellow
  { bg: "#fafafa", border: "#fed7aa", accent: "#f97316", text: "#7c2d12", muted: "#c2410c" }, // orange
  { bg: "#ffffff", border: "#fbcfe8", accent: "#ec4899", text: "#831843", muted: "#be185d" }, // pink
  { bg: "#fafafa", border: "#a8c4d8", accent: "#4a6fa5", text: "#1e2d47", muted: "#2a3a5c" }, // blue
  { bg: "#ffffff", border: "#bbf7d0", accent: "#22c55e", text: "#14532d", muted: "#15803d" }, // green
];

// ─── GENRE PILL COLORS (light mode) ─────────────────────────
export const PILL_COLORS = [
  { bg: "rgba(254,243,199,.8)", border: "#fde68a", color: "#92400e", activeBg: "linear-gradient(135deg,#fbbf24,#f59e0b)", activeShadow: "rgba(245,158,11,.35)" },
  { bg: "rgba(255,237,213,.8)", border: "#fed7aa", color: "#9a3412", activeBg: "linear-gradient(135deg,#fb923c,#f97316)", activeShadow: "rgba(249,115,22,.35)" },
  { bg: "rgba(253,242,248,.8)", border: "#fbcfe8", color: "#9d174d", activeBg: "linear-gradient(135deg,#f472b6,#ec4899)", activeShadow: "rgba(236,72,153,.35)" },
  { bg: "rgba(239,246,255,.8)", border: "#a8c4d8", color: "#1e40af", activeBg: "linear-gradient(135deg,#7a9dbf,#4a6fa5)", activeShadow: "rgba(74,111,165,.18)" },
  { bg: "rgba(240,253,244,.8)", border: "#bbf7d0", color: "#166534", activeBg: "linear-gradient(135deg,#4ade80,#22c55e)", activeShadow: "rgba(34,197,94,.35)" },
];
