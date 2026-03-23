import { useState, useEffect } from "react";

// ─── Debounce a value by `ms` milliseconds ───────────────────
export function useDebounce(value, ms) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(timer);
  }, [value, ms]);
  return debounced;
}

// ─── Track window scroll position ────────────────────────────
export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// ─── Per-movie user rating state with localStorage persistence ─────────
export function useRatings() {
  const [userRatings, setUserRatings] = useState(() => {
    try {
      const saved = localStorage.getItem("movie_user_ratings");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const [myRating, setMyRating] = useState(() => {
    try {
      const saved = localStorage.getItem("movie_my_ratings");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("movie_user_ratings", JSON.stringify(userRatings));
  }, [userRatings]);

  useEffect(() => {
    localStorage.setItem("movie_my_ratings", JSON.stringify(myRating));
  }, [myRating]);

  function submitRating(id, stars) {
    if (myRating[id]) return;
    setUserRatings(prev => ({ ...prev, [id]: [...(prev[id] || []), stars] }));
    setMyRating(prev => ({ ...prev, [id]: stars }));
  }

  function getAvg(id, tmdbBase) {
    const ur = userRatings[id] || [];
    if (!ur.length) return tmdbBase / 2;
    // We mix 12 "fake" seed ratings from TMDB with real user ratings
    return ((tmdbBase / 2) * 12 + ur.reduce((a, b) => a + b, 0)) / (12 + ur.length);
  }

  return { myRating, submitRating, getAvg };
}
