import { Tickets } from 'lucide-react';

import { CATEGORY_LABELS } from '@/common/const';
import type { Restaurant } from '@/common/types/Restaurant';
import useCustomStore from '@/zustand/store';
import { ScrollArea } from '@/components/ScrollArea';
import { Button } from '@/components/Button';
import { cn } from '@/common/util';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  // state.
  const editMode = useCustomStore((state) => state.editMode);
  
  // set method.
  const removeRestaurant = useCustomStore((state) => state.removeRestaurant);
  const toggleEditMode = useCustomStore((state) => state.toggleEditMode);

  return (
    <div className="w-full max-w-[600px] p-6 border-2 border-dashed border-gray-400 rounded-lg bg-cyan-400/10 bg-gray-50">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h3 className="m-0 text-xl font-semibold">식당 목록 ({restaurants.length}개)</h3>
        <Button
          className={cn('px-4 py-2 text-sm font-bold border-2 border-gray-500 rounded-lg cursor-pointer',
            editMode ? 'bg-gray-500' : 'bg-transparent text-gray-500 hover:bg-gray-500/10'
          )}
          onClick={() => toggleEditMode()}
        >
          {editMode ? '편집 종료' : '편집'}
        </Button>
      </div>
      <ScrollArea key="restaurant-list">
        <ul className="flex flex-col gap-1 list-none p-0 m-0 max-h-[200px] pr-2">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="flex items-center gap-4 bg-white/10 rounded pr-2"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="font-bold text-lg">{restaurant.name}</span>
                <span className="text-gray-400 text-sm">({CATEGORY_LABELS[restaurant.category]})</span>
                <span className="text-xl">
                  {restaurant.mealTicket === 'AVAILABLE' ? <Tickets size={16} /> : ''}
                </span>
              </div>
              {editMode && (
                <Button
                  variant="destructive"
                  className="p-2 w-6 h-6 flex items-center justify-center text-white border-none rounded cursor-pointer font-bold flex-shrink-0"
                  onClick={() => removeRestaurant(restaurant.id)}
                  aria-label="삭제"
                >
                  ✕
                </Button>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
