import { useState } from 'react';
import type { CategoryFilterType, MealticketFilterType } from '@/common/types/Restaurant';
import { CATEGORY_FILTER_TYPE, MEALTICKT_FILTER_TYPE } from '@/common/const';
import useCustomStore from '../zustand/store';
import { Button } from '@/components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Selector';
import { Input } from '@/components/Input';

export default function RestaurantForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CategoryFilterType>('KO');
  const [mealTicket, setMealTicket] = useState<MealticketFilterType>('AVAILABLE');

  // set method.
  const addRestaurant = useCustomStore((state) => state.addRestaurant);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addRestaurant({ name: name.trim(), category, mealTicket });
      setName('');
      setCategory('KO');
      setMealTicket('AVAILABLE');
    }
  };

  return (
    <div className="w-full max-w-[600px] p-6 border-2 border-indigo-500 rounded-lg bg-emerald-500/10 mb-4 bg-gray-50">
      <h3 className="mb-6 text-xl font-semibold text-indigo-500">새 식당 추가</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="restaurant-name" className="font-bold text-sm">
            식당 이름
          </label>
          <Input
            id="restaurant-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="식당 이름을 입력하세요"
            required
            className="w-full p-3 text-base border-2 border-indigo-500/30 rounded bg-white/10 transition-colors focus:outline-none focus:border-indigo-500 focus-visible:ring-0 focus-visible:border-indigo-500"
          />
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="restaurant-category" className="font-bold text-sm">
            카테고리
          </label>
          <Select value={category} onValueChange={(value) => setCategory(value as CategoryFilterType)}>
            <SelectTrigger className="w-full p-3 text-base border-2 border-indigo-500/30 rounded bg-white/10 transition-colors focus:outline-none focus:border-indigo-500">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent position="popper">
              {Object.values(CATEGORY_FILTER_TYPE).map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label htmlFor="restaurant-mealticket" className="font-bold text-sm">
            식권 사용
          </label>
          <Select value={mealTicket} onValueChange={(value) => setMealTicket(value as MealticketFilterType)}>
            <SelectTrigger className="w-full p-3 text-base border-2 border-indigo-500/30 rounded bg-white/10 transition-colors focus:outline-none focus:border-indigo-500">
              <SelectValue placeholder="식권 대장 여부 선택" />
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
        <Button
          type="submit"
          className="px-6 py-6 mt-2 text-base font-bold bg-indigo-500 text-white border-none rounded-lg cursor-pointer hover:bg-indigo-600"
        >
          추가하기
        </Button>
      </form>
    </div>
  );
}
