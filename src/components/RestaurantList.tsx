import { CATEGORY_LABELS } from '@/common/const';
import type { Restaurant } from '@/common/types/Restaurant';
import useCustomStore from '@/zustand/store';
import { ScrollArea } from '@/components/ScrollArea';
import { Button } from '@/components/Button';

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
        <button
          className={`px-4 py-2 text-sm font-bold border-2 border-indigo-500 rounded-lg cursor-pointer transition-all whitespace-nowrap ${
            editMode
              ? 'bg-indigo-500 text-white'
              : 'bg-transparent text-indigo-500 hover:bg-indigo-500/10'
          }`}
          onClick={() => toggleEditMode()}
        >
          {editMode ? '편집 완료' : '편집 모드'}
        </button>
      </div>
      <ScrollArea key="restaurant-list">
        <ul className="list-none p-0 m-0 max-h-[300px]">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant.id}
              className="flex justify-between items-center gap-4 p-3 my-2 bg-white/10 rounded"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="font-bold text-lg">{restaurant.name}</span>
                <span className="text-gray-400 text-sm">({CATEGORY_LABELS[restaurant.category]})</span>
                <span className="text-xl">
                  {restaurant.mealTicket === 'AVAILABLE' ? '🎫' : ''}
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
