// Generic Skeleton Block
export const Skeleton = ({ className = "", ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
};

// Skeleton for a single movie card
export const MovieCardSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Poster */}
      <Skeleton className="w-full h-64" />

      {/* Movie info */}
      <div className="p-3">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
};

// Grid of movie card skeletons
export const GridSkeleton = ({ count = 20 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
};
