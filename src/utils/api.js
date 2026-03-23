import { TMDB_HEADERS, FALLBACK } from "../components/constants.js";

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

    const res = await fetch(
      `https://api.themoviedb.org/3${path}`,
      { headers: TMDB_HEADERS }
    );

    const data = await res.json();
    const result = data.results?.filter(m => m.poster_path) || [];
    return result.length ? result : FALLBACK;

  } catch (error) {
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
  try {
    const [det, cred] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}`, { headers: TMDB_HEADERS }).then(r => r.json()),
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, { headers: TMDB_HEADERS }).then(r => r.json()),
    ]);

    return { ...det, cast: cred.cast?.slice(0, 6) || [] };
  } catch (error) {
    throw error;
  }
}
