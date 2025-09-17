import { useState, useEffect } from "react";
import { api } from "../api/tmdb";

export const useMovieDetails = (movieId) => {
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setMovieData(null);
      return;
    }

    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await api.getMovieDetails(movieId);
        setMovieData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();

    // Cleanup function to cancel request if component unmounts
    return () => {
      setMovieData(null);
    };
  }, [movieId]);

  return { movieData, loading, error };
};
