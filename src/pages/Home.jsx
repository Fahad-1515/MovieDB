import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { GridLayout } from "../components/layout/GridLayout";
import MovieCard from "../components/movie/MovieCard";
import { CategoryTabs } from "../components/movie/CategoryTabs";
import Loader from "../components/ui/Loader";

export const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const { movies, loading, error } = useMovies(selectedCategory);

  const categories = [
    { key: "popular", label: "Popular" },
    { key: "trending", label: "Trending" },
    { key: "top_rated", label: "Top Rated" },
    { key: "upcoming", label: "Upcoming" },
  ];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Error Loading Movies</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Discover Movies
          </h1>
          <p className="text-gray-400 text-lg">
            Explore the latest and greatest movies
          </p>
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Movie Grid */}
        <div className="mt-8">
          {loading ? (
            <div className="text-center">
              <Loader size="lg" />
              <p className="text-gray-400 mt-4">Loading movies...</p>
            </div>
          ) : Array.isArray(movies) && movies.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-6 capitalize">
                {selectedCategory.replace("_", " ")} Movies
              </h2>
              <GridLayout>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </GridLayout>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
