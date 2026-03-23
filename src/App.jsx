import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import GenreStrip from "./components/GenreStrip.jsx";
import FilterBar from "./components/FilterBar.jsx";
import MovieCard from "./components/MovieCard.jsx";
import MovieModal from "./components/MovieModal.jsx";
import Loader from "./components/Loader.jsx";
import Footer from "./components/Footer.jsx";
import { useDebounce, useScrolled, useRatings } from "./components/hooks.js";
import { GENRE_MAP } from "./components/constants.js";
import { fetchMovies, fetchMovieDetail } from "./utils/api.js";
import { filterMovies, getSectionTitle } from "./utils/genres.js";
import "./styles/base.css";
import "./styles/MovieCard.css";
import "./styles/Loader.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [dark, setDark] = useState(false);
  const [modal, setModal] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detLoad, setDetLoad] = useState(false);

  const dSearch = useDebounce(search, 360);
  const scrolled = useScrolled(12);
  const { myRating, submitRating, getAvg } = useRatings();

  // ── Fetch movies ──────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(dSearch);
        if (isMounted) setMovies(data);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadMovies();
    return () => { isMounted = false; };
  }, [dSearch]);

  // ── Open modal ───────────────────────────────────────────
  async function openModal(movie) {
    setModal(movie);
    setDetail(null);
    setDetLoad(true);
    try {
      const details = await fetchMovieDetail(movie.id);
      setDetail(details);
    } catch {
      setDetail({
        ...movie,
        genres: (movie.genre_ids || []).slice(0, 3).map(id => ({ id, name: GENRE_MAP[id] || "" })),
        runtime: 0,
        cast: [],
      });
    } finally {
      setDetLoad(false);
    }
  }

  function closeModal() {
    setModal(null);
    setDetail(null);
  }

  // ── Filtered list ────────────────────────────────────────
  const filtered = filterMovies(movies, search, genre, year, minRating);
  const sectionTitle = getSectionTitle(search, genre);

  // ── Page background ──────────────────────────────────────
  const pageBg = dark
    ? "linear-gradient(135deg,#0f0a1e 0%,#160d2b 50%,#0d0a1a 100%)"
    : "linear-gradient(135deg,#fffde7 0%,#fff0f5 25%,#eff6ff 55%,#f0fdf4 80%,#fffde7 100%)";

  return (
    <div
      className="min-h-screen font-outfit"
      style={{ background: pageBg, color: dark ? "#e2d9f3" : "#3b1f08" }}
    >
      <style>{`
        ::-webkit-scrollbar-thumb { background:${dark ? "#2d1f4e" : "#fbcfe8"}; border-radius:99px; }
      `}</style>

      {/* ── Navigation ── */}
      <Navbar
        dark={dark}
        scrolled={scrolled}
        search={search}
        onSearch={setSearch}
        onToggleTheme={() => setDark(d => !d)}
      />

      {/* ── Genre filter strip ── */}
      <GenreStrip genre={genre} onGenre={setGenre} dark={dark} />

      {/* ── Year + Rating filter bar ── */}
      <FilterBar
        dark={dark}
        year={year}
        onYear={setYear}
        minRating={minRating}
        onMinRating={setMinRating}
      />

      {/* ── Main content ── */}
      <main className="px-7 py-6">

        {/* Section header */}
        {!loading && filtered.length > 0 && (
          <div className="flex items-baseline justify-between mb-5">
            <h2
              className="font-lora text-xl font-bold"
              style={{ color: dark ? "#a78bfa" : "#7c2d12" }}
            >
              {sectionTitle}
            </h2>
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: dark ? "#4c1d95" : "#d97706" }}
            >
              {filtered.length} {filtered.length === 1 ? "title" : "titles"}
            </span>
          </div>
        )}

        {/* States: loading / empty / grid */}
        {loading ? (
          <Loader dark={dark} />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-32">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke={dark ? "#2d1f4e" : "#fbcfe8"} strokeWidth="1.4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <div
              className="text-xs font-bold tracking-[.2em] uppercase"
              style={{ color: dark ? "#2d1f4e" : "#fbcfe8" }}
            >
              No Results Found
            </div>
          </div>
        ) : (
          <div className="grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
          >
            {filtered.map((movie, i) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                index={i}
                avg={getAvg(movie.id, movie.vote_average)}
                dark={dark}
                onOpen={openModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <Footer dark={dark} />

      {/* ── Detail modal ── */}
      {modal && (
        <MovieModal
          movie={modal}
          detail={detail}
          detLoad={detLoad}
          onClose={closeModal}
          myRating={myRating[modal.id]}
          onRate={s => submitRating(modal.id, s)}
          avgRating={getAvg(modal.id, modal.vote_average)}
          dark={dark}
        />
      )}
    </div>
  );
}
