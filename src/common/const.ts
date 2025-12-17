export const MEALTICKT_FILTER_TYPE = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
} as const;

export const CATEGORY_FILTER_TYPE = {
  KO: 'KO',
  JA: 'JA',
  CH: 'CH',
  ETC: 'ETC'
} as const;

export const CATEGORY_LABELS: Record<typeof CATEGORY_FILTER_TYPE[keyof typeof CATEGORY_FILTER_TYPE], string> = {
  KO: '한식/분식',
  JA: '일식',
  CH: '중식',
  ETC: 'ETC'
} as const;

export const BASE_URL = `${import.meta.env.VITE_SERVER_ADDRESS}/api`;

export const API = {
  ORGANIZATION: '/organization',
  ORGANIZATION_BY_CODE: (code: string) => `/organization/${code}`,
  MENUS: (code: string) => `/menu/${code}/menus`,
} as const;