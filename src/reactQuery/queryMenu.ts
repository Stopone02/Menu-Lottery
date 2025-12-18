import { API, BASE_URL } from '@/common/const'
import type { Restaurant, CategoryFilterType } from '@/common/types/Restaurant'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// response.
interface MenuResponse {
  id: string
  orgId: string
  name: string
  category: string
  mealTicket: boolean
  createdAt: string
  updatedAt: string
}

// request.
interface CreateMenuBody {
  orgId: string
  name: string
  dist?: number
  mealTicket: boolean
  category: string
}

interface UpdateMenuParams {
  menuId: string
  orgId: string
  name?: string
  category?: string
  mealTicket?: boolean
}

// get.
const getMenus = async (orgId: string): Promise<MenuResponse[]> => {
  const response = await fetch(`${BASE_URL}${API.MENUS(orgId)}`, {
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

export const useMenusQuery = (orgId: string | undefined) => {
  return useQuery({
    queryKey: ['menus', orgId],
    queryFn: () => getMenus(orgId!),
    enabled: !!orgId,
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

// post.
const createMenu = async (body: CreateMenuBody): Promise<MenuResponse> => {
  const response = await fetch(`${BASE_URL}${API.MENU()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orgId: body.orgId,
      name: body.name,
      dist: body.dist ?? 0,
      mealTicket: body.mealTicket,
      category: body.category,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create menu')
  }

  return response.json()
}

export const useCreateMenuMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['menus', variables.orgId] })
    },
  })
}

// put.
const updateMenu = async ({ menuId, ...body }: UpdateMenuParams): Promise<MenuResponse> => {
  const response = await fetch(`${BASE_URL}${API.MENU(menuId)}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: body.name,
      category: body.category,
      mealTicket: body.mealTicket,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update menu')
  }

  return response.json()
}

export const useUpdateMenuMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['menus', variables.orgId] })
    },
  })
}

// delete.
interface DeleteMenuParams {
  menuId: string
  orgId: string
}

const deleteMenu = async ({ menuId }: DeleteMenuParams): Promise<void> => {
  const response = await fetch(`${BASE_URL}${API.MENU(menuId)}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete menu')
  }
}

export const useDeleteMenuMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMenu,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['menus', variables.orgId] })
    },
  })
}
