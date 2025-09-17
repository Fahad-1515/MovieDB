import { useState } from "react";
import { Heart } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";

export const AddToWatchlistButton = ({
  movie,
  size = "md",
  showLabel = false,
}) => {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const isSaved = isInWatchlist(movie?.id);

  const sizeClasses = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  const iconSizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAnimating(true);
    isSaved ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative flex items-center justify-center rounded-full transition-all duration-300
        ${
          isSaved
            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
            : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/70 hover:text-white"
        }
        ${sizeClasses[size]} ${isAnimating ? "scale-110" : "scale-100"}`}
      aria-label={isSaved ? "Remove from watchlist" : "Add to watchlist"}
    >
      {isAnimating && (
        <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping"></div>
      )}
      <Heart
        className={`${iconSizes[size]} transition-all duration-300 ${
          isSaved ? "fill-current" : ""
        } ${isAnimating ? "scale-125" : "scale-100"}`}
      />
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isSaved ? "Saved" : "Save"}
        </span>
      )}
    </button>
  );
};

export const HeartIconButton = ({ movie, size = "md" }) => (
  <AddToWatchlistButton movie={movie} size={size} showLabel={false} />
);
export const WatchlistButtonWithLabel = ({ movie, size = "md" }) => (
  <AddToWatchlistButton movie={movie} size={size} showLabel={true} />
);

export default AddToWatchlistButton;
