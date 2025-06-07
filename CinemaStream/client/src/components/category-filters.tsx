import { Button } from "@/components/ui/button";
import type { Category } from "@/lib/types";
import { categories } from "@shared/schema";

interface CategoryFiltersProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function CategoryFilters({ activeCategory, onCategoryChange }: CategoryFiltersProps) {
  const categoryLabels: Record<Category, string> = {
    all: "All",
    action: "Action",
    drama: "Drama",
    comedy: "Comedy",
    thriller: "Thriller",
    "sci-fi": "Sci-Fi",
    horror: "Horror",
    romance: "Romance",
    adventure: "Adventure",
    fantasy: "Fantasy",
  };

  return (
    <section className="py-8 bg-dark-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              variant={activeCategory === category ? "default" : "secondary"}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-netflix-red text-white hover:bg-red-700"
                  : "bg-card-grey text-gray-400 hover:bg-gray-600 hover:text-white"
              }`}
            >
              {categoryLabels[category]}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
