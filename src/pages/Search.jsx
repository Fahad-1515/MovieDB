// src/pages/Search.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/movie/MovieCard";
import { GridLayout } from "../components/layout/GridLayout";
import Loader from "../components/ui/Loader";
import { Search as SearchIcon } from "lucide-react";
import Button from "../components/ui/Button";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);

  const { movies, loading, error, totalPages, totalResults } = useMovies({
    query,
    page,
  });

  // Reset when query changes
  useEffect(() => {
    setPage(1);
    setAllMovies([]);
  }, [query]);

  // Accumulate movies
  useEffect(() => {
    if (movies.length > 0) {
      setAllMovies((prev) => (page === 1 ? movies : [...prev, ...movies]));
    }
  }, [movies, page]);

  const hasMore = page < totalPages;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8 pt-24 text-center">
          <div className="text-red-400 text-lg mb-4">Error loading results</div>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            {query ? `Search Results for "${query}"` : "Search Movies"}
          </h1>

          {!query && (
            <div className="text-gray-400 flex items-center justify-center">
              <SearchIcon className="w-5 h-5 mr-2" />
              Use the search bar to find your favorite movies
            </div>
          )}

          {query && totalResults > 0 && (
            <p className="text-gray-400">
              Found {totalResults.toLocaleString()} result
              {totalResults !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* Loading state for initial load */}
        {loading && page === 1 && (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        )}

        {/* No results */}
        {query && allMovies.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-12">
            No movies found for "{query}"
          </div>
        )}

        {/* Results */}
        {allMovies.length > 0 && (
          <>
            <GridLayout>
              {allMovies.map((movie) => (
                <MovieCard key={`${movie.id}-${page}`} movie={movie} />
              ))}
            </GridLayout>

            {/* Load more button */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                  variant="primary"
                  className="min-w-[120px]"
                >
                  {loading ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
