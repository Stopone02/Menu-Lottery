import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import type { Restaurant, CategoryFilterType, MealticketFilterType } from '@/common/types/Restaurant';
import { CATEGORY_FILTER_TYPE, CATEGORY_LABELS, MEALTICKT_FILTER_TYPE } from '@/common/const';
import { Button } from '@/common/components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/Selector';
import { Input } from '@/common/components/Input';
import { useUpdateMenuMutation } from '@/reactQuery/queryMenu';

interface RestaurantEditFormProps {
  restaurant: Restaurant;
  orgId: string;
  onCancel: () => void;
}

export default function RestaurantEditForm({ restaurant, orgId, onCancel }: RestaurantEditFormProps) {
  // state.
  const [name, setName] = useState(restaurant.name);
  const [category, setCategory] = useState<CategoryFilterType>(restaurant.category);
  const [mealTicket, setMealTicket] = useState<MealticketFilterType>(restaurant.mealTicket);

  // query.
  const { mutate: updateMenu, isError, isSuccess } = useUpdateMenuMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateMenu({
        menuId: restaurant.id,
        orgId,
        name: name.trim(),
        mealTicket: mealTicket === 'AVAILABLE',
        category,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('메뉴가 수정되었습니다.');
      onCancel();
      return;
    }
    if (isError) {
      toast.error('메뉴 수정에 실패했습니다.');
      return;
    }
  }, [isSuccess, isError, onCancel]);

  return (
    <div className="w-full p-4 border-2 border-amber-500 rounded-lg bg-amber-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col items-start gap-1">
          <Input
            id={`edit-name-${restaurant.id}`}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="식당 이름을 입력하세요"
            required
            className="w-full p-2 text-sm border-2 border-amber-500/30 rounded bg-white transition-colors focus:outline-none focus:border-amber-500 focus-visible:ring-0 focus-visible:border-amber-500"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-start gap-1 flex-1">
            <Select value={category} onValueChange={(value) => setCategory(value as CategoryFilterType)}>
              <SelectTrigger className="w-full p-2 text-sm border-2 border-amber-500/30 rounded bg-white transition-colors focus:outline-none focus:border-amber-500">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Object.values(CATEGORY_FILTER_TYPE).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-1 flex-1">
            <Select value={mealTicket} onValueChange={(value) => setMealTicket(value as MealticketFilterType)}>
              <SelectTrigger className="w-full p-2 text-sm border-2 border-amber-500/30 rounded bg-white transition-colors focus:outline-none focus:border-amber-500">
                <SelectValue placeholder="식권 사용 여부" />
              </SelectTrigger>
              <SelectContent position="popper">
                {Object.values(MEALTICKT_FILTER_TYPE).map((ticket) => (
                  <SelectItem key={ticket} value={ticket}>
                    {ticket === 'AVAILABLE' ? '사용 가능' : '사용 불가'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-4 py-2 text-sm"
          >
            취소
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 text-sm bg-amber-500 hover:bg-amber-600"
          >
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
