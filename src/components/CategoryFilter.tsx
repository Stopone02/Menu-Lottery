import type { CategoryFilterOption, CategoryFilterType } from '../types/Restaurant';

interface CategoryFilterProps {
  categories: CategoryFilterType[];
  filters: CategoryFilterOption;
  onFilterChange: (category: string, checked: boolean) => void;
}

export default function CategoryFilter({ categories, filters, onFilterChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <h3>카테고리 필터</h3>
      <div className="filter-options">
        {categories.map((category) => (
          <label key={category} className="filter-option">
            <input
              type="checkbox"
              checked={filters[category]}
              onChange={(e) => onFilterChange(category, e.target.checked)}
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
