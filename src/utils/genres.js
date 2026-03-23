import { GENRE_MAP } from "../components/constants.js";

/**
 * Filter movies by genre
 */
export function filterByGenre(movies, selectedGenre) {
  if (selectedGenre === "All") return movies;
  const genreId = Object.entries(GENRE_MAP).find(([, v]) => v === selectedGenre)?.[0];
  if (!genreId) return movies;
  return movies.filter(m => m.genre_ids?.includes(Number(genreId)));
}

/**
 * Filter movies by title search
 */
export function filterBySearch(movies, searchTerm) {
  if (!searchTerm.trim()) return movies;
  return movies.filter(m =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

/**
 * Apply search, genre, year, and minRating filters.
 * Search takes priority; when active genre is ignored.
 */
export function filterMovies(movies, searchTerm, genre, year = "All", minRating = 0) {
  let result = searchTerm.trim()
    ? filterBySearch(movies, searchTerm)
    : filterByGenre(movies, genre);

  // Year filter
  if (year && year !== "All") {
    result = result.filter(m => m.release_date?.slice(0, 4) === String(year));
  }

  // Min rating filter (TMDB vote_average is out of 10, user stars are out of 5)
  if (minRating > 0) {
    result = result.filter(m => (m.vote_average / 2) >= minRating);
  }

  return result;
}

/**
 * Get section title based on active filters
 */
export function getSectionTitle(searchTerm, genre) {
  if (searchTerm.trim()) return `Results for "${searchTerm.trim()}"`;
  return genre === "All" ? "Popular Films" : genre;
}
