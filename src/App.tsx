import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import RestaurantList from '@/widgets/RestaurantList'
import RandomPicker from '@/widgets/RandomPicker'
import RestaurantForm from '@/widgets/RestaurantForm'
import { ScrollArea } from '@/common/components/ScrollArea'
import { FilterContent } from '@/widgets/FilterContent'
import useCustomStore from '@/zustand/store'
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/common/components/Dialog'
import { toast } from 'sonner'
import { Share2, Copy, Check } from 'lucide-react'
import { Button } from '@/common/components/Button'
import { CreateOrg } from '@/widgets/CreateOrg'
import { Toaster } from '@/common/components/Toast'
import { useMenusQuery } from '@/reactQuery/queryMenu'
import { useOrganizationQuery } from '@/reactQuery/queryOrg'

function App() {
  const navigate = useNavigate();

  // params.
  const { code: codeParam } = useParams<{ code?: string }>();
  const code = codeParam;

  // state.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const currentUrl = window.location.href;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setIsCopied(true);
    toast.success('링크가 복사되었습니다!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // query.
  const { data: organization, isError } = useOrganizationQuery(code ?? 'DEFAULT');

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
        <h1 className="text-4xl font-bold mb-1 flex items-center gap-3">
          <img src="/Menu-Lottery/favicon.ico" alt="icon" className="w-8 h-8" />
          {organization ? `${organization.code.length > 7 ? 'organization.code'.slice(0, 7) + '...' : 'DEFAULT' === organization.code ? '메뉴 추첨기' : organization.code }` : '메뉴 추첨기'}
          <img src="/Menu-Lottery/favicon.ico" alt="icon" className="w-8 h-8" />
        </h1>

        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild className='max-w-[600px] w-full '>
            <Button className="bg-transparent justify-end flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 hover:bg-transparent">
              <Share2 className="w-4 h-4" />
              <span>공유하기</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>링크 공유</DialogTitle>
              <DialogDescription>
                우리들만의 메뉴 추첨기를 공유하세요!
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-50 text-gray-700"
              />
              <Button
                onClick={handleCopyUrl}
                className="px-3"
                variant="outline"
              >
                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {!code && <CreateOrg />}

        <FilterContent restaurants={(restaurants ?? [])}/>

        <RestaurantList
          restaurants={filteredRestaurants}
        />

        {editMode && organization && (<RestaurantForm orgId={organization.id} />)}

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
