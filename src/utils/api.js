import { TMDB_HEADERS, FALLBACK } from "../components/constants.js";

async function fetchJson(path) {
  const res = await fetch(`https://api.themoviedb.org/3${path}`, {
    headers: TMDB_HEADERS,
  });

  if (!res.ok) {
    throw new Error(`TMDB request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch movies from TMDB API or return fallback data
 * @param {string} searchQuery - Search term or empty string for popular movies
 * @returns {Promise<Array>} Array of movie objects
 */
export async function fetchMovies(searchQuery) {
  try {
    const path = searchQuery.trim()
      ? `/search/movie?query=${encodeURIComponent(searchQuery)}&page=1`
      : `/movie/popular?page=1`;

    const data = await fetchJson(path);
    const result = data.results?.filter(m => m.poster_path) || [];
    return searchQuery.trim() ? result : (result.length ? result : FALLBACK);

  } catch {
    // Fallback to local data on error
    const q = searchQuery.toLowerCase();
    return q
      ? FALLBACK.filter(m => m.title.toLowerCase().includes(q))
      : FALLBACK;
  }
}

/**
 * Fetch full movie details + cast from TMDB
 * @param {number} movieId - TMDB movie ID
 * @returns {Promise<Object>} Object with details and cast
 */
export async function fetchMovieDetail(movieId) {
  const [det, cred] = await Promise.all([
    fetchJson(`/movie/${movieId}`),
    fetchJson(`/movie/${movieId}/credits`),
  ]);

  return { ...det, cast: cred.cast?.slice(0, 6) || [] };
}
