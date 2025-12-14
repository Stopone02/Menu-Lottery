import { useState, useMemo } from 'react'

import RestaurantList from '@/components/RestaurantList'
import RandomPicker from '@/components/RandomPicker'
import RestaurantForm from '@/components/RestaurantForm'
import { ScrollArea } from '@/components/ScrollArea'
import { FilterContent } from '@/widgets/FilterContent'
import useCustomStore from '@/zustand/store'
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/Dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '@/components/Button'

function App() {
  // state.
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const editMode = useCustomStore((state) => state.editMode);
  const restaurants = useCustomStore((state) => state.restaurants);
  const categoryFilters = useCustomStore((state) => state.categoryFilters);
  const mealTicketFilters = useCustomStore((state) => state.mealTicketFilters);
  const isSpinning = useCustomStore((state) => state.isSpinning);

  // 필터링된 식당 목록
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant =>
      categoryFilters[restaurant.category] && mealTicketFilters[restaurant.mealTicket]
    );
  }, [restaurants, categoryFilters, mealTicketFilters]);

  return (
    <ScrollArea className='h-screen'>
      <div className="flex flex-col items-center gap-8 py-8 font-pretendard">
        <h1 className="text-4xl font-bold mb-4">메뉴 추첨기</h1>

        <FilterContent />

        <RestaurantList
          restaurants={filteredRestaurants}
        />

        {editMode && (<RestaurantForm />)}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-xl px-8 py-6 bg-blue-500"
              disabled={filteredRestaurants.length === 0 || isSpinning}
            >
              {filteredRestaurants.length === 0 ? '선택 가능한 식당이 없습니다' : '메뉴 추첨하기!'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader hidden />
            <DialogDescription>
              <RandomPicker
                restaurants={filteredRestaurants}
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  )
}

export default App
