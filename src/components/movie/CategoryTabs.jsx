import React from "react";

export const CategoryTabs = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {categories.map((category) => {
        const isActive = category.key === selectedCategory;
        return (
          <button
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            aria-pressed={isActive}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
