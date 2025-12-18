import { useMemo } from 'react';

import useCustomStore from '@/zustand/store';
import { Checkbox } from '@/common/components/Checkbox';
import { Label } from '@/common/components/Label';
import type { Restaurant } from '@/common/types/Restaurant';

export default function MealTicketFilter({ restaurants }: { restaurants: Restaurant[] }) {
  // state.
  const filters = useCustomStore((state) => state.mealTicketFilters);

  // set method.
  const setFilters = useCustomStore((state) => state.setMealTicketFilter);

  const mealTickets = useMemo(() => {
      const uniqueMealTickets = new Set(restaurants.map(r => r.mealTicket));
      return Array.from(uniqueMealTickets);
    }, [restaurants]);

  return (
    <div className="w-full max-w-[600px] p-6 border-2 border-dashed border-gray-400 rounded-lg bg-gray-50">
      <h3 className="mb-4 text-xl font-semibold">식권 대장</h3>
      <div className="flex flex-col gap-4 justify-center">
        {mealTickets.map((mealTicket) => (
          <div className='flex items-start gap-3' key={mealTicket}>
            <Checkbox
              checked={filters[mealTicket]}
              className="cursor-pointer w-[18px] h-[18px]"
              onCheckedChange={(checked) => {
                setFilters(mealTicket, checked === true);
              }}
            />
            <Label className="flex-shrink-0" htmlFor='toggle'>{mealTicket === 'AVAILABLE' ? '사용 가능' : '사용 불가'}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}
