import { API, BASE_URL } from '@/common/const'
import type { Organization } from '@/common/types/Organization'
import { useMutation, useQuery } from '@tanstack/react-query'

// request.
interface AddOrganizationRequest {
  code: string
}

// response.
interface AddOrganizationResponse {
  success: boolean
  data?: unknown
}

interface GetOrganizationByCodeResponse {
  id: string;
  code: string;
  createdAt: string;
}

const addOrganization = async (request: AddOrganizationRequest): Promise<AddOrganizationResponse> => {
  const response = await fetch(`${BASE_URL}${API.ORGANIZATION}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })

  if (!response.ok) {
    throw new Error('Failed to fetch organization')
  }

  return response.json()
}

export const useOrganizationMutation = () => {
  return useMutation({
    mutationFn: addOrganization,
  })
}

const getOrganizationByCode = async (code: string): Promise<GetOrganizationByCodeResponse> => {
  const response = await fetch(`${BASE_URL}${API.ORGANIZATION_BY_CODE(code)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch organization')
  }

  return response.json()
}

export const useOrganizationQuery = (code: string | undefined) => {
  return useQuery({
    queryKey: ['organization', code],
    queryFn: () => getOrganizationByCode(code!),
    enabled: !!code,
    select: (data): Organization => ({
      id: data.id,
      code: data.code,
      createdAt: new Date(data.createdAt),
    }),
  })
}
