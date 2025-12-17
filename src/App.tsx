import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import RestaurantList from '@/widgets/RestaurantList'
import RandomPicker from '@/widgets/RandomPicker'
import RestaurantForm from '@/widgets/RestaurantForm'
import { ScrollArea } from '@/common/components/ScrollArea'
import { FilterContent } from '@/widgets/FilterContent'
import useCustomStore from '@/zustand/store'
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader } from '@/common/components/Dialog'
import { Button } from '@/common/components/Button'
import { CreateOrg } from '@/widgets/CreateOrg'
import { Toaster } from '@/common/components/Toast'
import { useMenusQuery } from '@/reactQuery/queryMenu'
import { useOrganizationQuery } from '@/reactQuery/queryOrg'

function App() {
  // params.
  const { code } = useParams<{ code?: string }>();
  const navigate = useNavigate();

  // state.
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // query.
  const { data: organization, isError } = useOrganizationQuery(code);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);
  const { data: restaurants } = useMenusQuery(organization?.id);

  // store.
  const editMode = useCustomStore((state) => state.editMode);
  const categoryFilters = useCustomStore((state) => state.categoryFilters);
  const mealTicketFilters = useCustomStore((state) => state.mealTicketFilters);

  // 필터링된 식당 목록
  const filteredRestaurants = useMemo(() => {
    return (restaurants ?? []).filter(restaurant =>
      categoryFilters[restaurant.category] && mealTicketFilters[restaurant.mealTicket]
    );
  }, [restaurants, categoryFilters, mealTicketFilters]);

  return (
    <>
      <Toaster position="top-center" />
      <ScrollArea className='h-screen w-full'>
      <div className="flex flex-col items-center gap-3 py-8 font-pretendard px-[20px]">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <img src="/Menu-Lottery/favicon.ico" alt="icon" className="w-8 h-8" />
          {organization ? `${organization.code}의 메뉴 추첨기` : '메뉴 추첨기'}
          <img src="/Menu-Lottery/favicon.ico" alt="icon" className="w-8 h-8" />
        </h1>

        {!code && <CreateOrg />}

        <FilterContent restaurants={(restaurants ?? [])}/>

        <RestaurantList
          restaurants={filteredRestaurants}
        />

        {editMode && (<RestaurantForm />)}

        {!editMode && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="text-xl px-8 py-6 bg-blue-500 hover:bg-blue-600"
                disabled={filteredRestaurants.length === 0}
              >
                {filteredRestaurants.length === 0 ? '선택 가능한 식당이 없습니다' : isDialogOpen ? '추첨 중...': '메뉴 추첨하기!'}
              </Button>
            </DialogTrigger>
            <DialogContent className="min-h-[300px]">
              <DialogHeader hidden />
              <DialogDescription>
                <RandomPicker
                  restaurants={filteredRestaurants}
                />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        )}
      </div>
      </ScrollArea>
    </>
  )
}

export default App
