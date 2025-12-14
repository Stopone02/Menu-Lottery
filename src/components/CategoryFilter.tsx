import { useMemo } from 'react';

import useCustomStore from '@/zustand/store';
import { Checkbox } from '@/components/Checkbox';
import { Label } from '@/components/Label';
import { CATEGORY_LABELS } from '@/common/const';

export default function CategoryFilter() {
  // state.
  const restaurants = useCustomStore((state) => state.restaurants);
  const filters = useCustomStore((state) => state.categoryFilters);

  // set method.
  const setFilters = useCustomStore((state) => state.setCategoryFilter);

  const categories = useMemo(() => {
      const uniqueCategories = new Set(restaurants.map(r => r.category));
      return Array.from(uniqueCategories);
    }, [restaurants]);

  return (
    <div className="w-full max-w-[600px] p-6 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
      <h3 className="mb-4 text-xl font-semibold">카테고리</h3>
      <div className="flex flex-col gap-4 justify-center">
        {categories.map((category) => (
          <div className='flex items-start gap-3' key={category}>
            <Checkbox
              checked={filters[category]}
              onCheckedChange={(checked) => {
                setFilters(category, checked === true);
              }}
            />
            <Label htmlFor='toggle'>{CATEGORY_LABELS[category]}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
