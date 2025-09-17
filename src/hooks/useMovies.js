import { useState, useEffect } from "react";
import { api } from "../api/tmdb";

export const useMovies = (options = {}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  // Handle both object options and string category (backward compatibility)
  let category,
    query,
    page = 1;

  if (typeof options === "string") {
    category = options;
  } else {
    ({ category, query, page = 1 } = options);
  }

  useEffect(() => {
    const fetchMovies = async () => {
      // Don't fetch if no category or query provided
      if (!category && !query) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let data;

        if (query) {
          // Search movies
          data = await api.searchMovies(query, page);
        } else {
          // Fetch by category
          switch (category) {
            case "trending":
              data = await api.getTrendingMovies(page);
              break;
            case "popular":
              data = await api.getPopularMovies(page);
              break;
            case "top_rated":
              data = await api.getTopRatedMovies(page);
              break;
            case "upcoming":
              data = await api.getUpcomingMovies(page);
              break;
            default:
              throw new Error(`Unknown category: ${category}`);
          }
        }

        setMovies(Array.isArray(data.results) ? data.results : []);
        setTotalPages(data.total_pages || 0);
        setTotalResults(data.total_results || 0);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError(err.message || "Failed to fetch movies. Please try again.");
        setMovies([]);
        setTotalPages(0);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, query, page]);

  return {
    movies,
    loading,
    error,
    totalPages,
    totalResults,
  };
};
