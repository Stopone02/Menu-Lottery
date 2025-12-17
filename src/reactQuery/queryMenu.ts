import { API, BASE_URL } from '@/common/const'
import type { Restaurant, CategoryFilterType } from '@/common/types/Restaurant'
import { useQuery } from '@tanstack/react-query'

interface MenuResponse {
  id: string
  orgId: string
  name: string
  category: string
  mealTicket: boolean
  createdAt: string
  updatedAt: string
}

const getMenus = async (code: string): Promise<MenuResponse[]> => {
  const response = await fetch(`${BASE_URL}${API.MENUS(code)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch menus')
  }

  return response.json()
}

export const useMenusQuery = (code: string | undefined) => {
  return useQuery({
    queryKey: ['menus', code],
    queryFn: () => getMenus(code!),
    enabled: !!code,
    select: (data): Restaurant[] => data.map((item) => ({
      id: item.id,
      orgId: item.orgId,
      name: item.name,
      category: item.category as CategoryFilterType,
      mealTicket: item.mealTicket ? 'AVAILABLE' : 'UNAVAILABLE',
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    })),
  })
}
