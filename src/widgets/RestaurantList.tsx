import { useEffect, useState } from 'react';
import { Pencil, Tickets } from 'lucide-react';
import { toast } from 'sonner';

import { CATEGORY_LABELS } from '@/common/const';
import type { Restaurant } from '@/common/types/Restaurant';
import useCustomStore from '@/zustand/store';
import { ScrollArea } from '@/common/components/ScrollArea';
import { Button } from '@/common/components/Button';
import { cn } from '@/common/util';
import { useDeleteMenuMutation } from '@/reactQuery/queryMenu';

import RestaurantEditForm from './RestaurantEditForm';

interface RestaurantListProps {
  restaurants: Restaurant[];
  orgId?: string;
}

export default function RestaurantList({ restaurants, orgId }: RestaurantListProps) {
  // state.
  const editMode = useCustomStore((state) => state.editMode);
  const [editingId, setEditingId] = useState<string | null>(null);

  // set method.
  const toggleEditMode = useCustomStore((state) => state.toggleEditMode);

  // mutation.
  const { mutate: deleteMenu, isError, isSuccess } = useDeleteMenuMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('메뉴가 제거되었습니다.');
      return;
    }
    if (isError) {
      toast.error('메뉴 제거에 실패했습니다.');
      return;
    }
  }, [isSuccess, isError]);

  return (
    <div className="w-full max-w-[600px] p-6 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
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
      <ScrollArea className="h-[200px]">
        <ul className="flex flex-col gap-1 list-none p-0 m-0 pr-2">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              {editingId === restaurant.id && orgId ? (
                <RestaurantEditForm
                  restaurant={restaurant}
                  orgId={orgId}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex items-center gap-4 bg-white/10 rounded pr-2">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="font-bold text-lg">{restaurant.name}</span>
                    <span className="text-gray-400 text-sm">({CATEGORY_LABELS[restaurant.category]})</span>
                    <span className="text-xl">
                      {restaurant.mealTicket === 'AVAILABLE' ? <Tickets size={16} /> : ''}
                    </span>
                  </div>
                  {editMode && (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        className="p-2 w-6 h-6 flex items-center justify-center border-none rounded cursor-pointer flex-shrink-0"
                        onClick={() => setEditingId(restaurant.id)}
                        aria-label="수정"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="destructive"
                        className="p-2 w-6 h-6 flex items-center justify-center text-white border-none rounded cursor-pointer font-bold flex-shrink-0"
                        onClick={() => orgId && deleteMenu({ menuId: restaurant.id, orgId })}
                        aria-label="삭제"
                      >
                        ✕
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
