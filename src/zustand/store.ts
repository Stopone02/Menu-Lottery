import { create } from 'zustand';

import type { CategoryFilterOption, MealTicketFilterOption, Restaurant } from '@/common/types/Restaurant';
import { CATEGORY_FILTER_TYPE, MEALTICKT_FILTER_TYPE } from '@/common/const';

interface store {
  restaurants: Restaurant[];
  nextId: number;
  editMode: boolean;
  categoryFilters: CategoryFilterOption;
  mealTicketFilters: MealTicketFilterOption;

  toggleEditMode: () => void;
  setCategoryFilter: (category: keyof CategoryFilterOption, checked: boolean) => void;
  setMealTicketFilter: (mealTicket: keyof MealTicketFilterOption, checked: boolean) => void;
}

const useCustomStore = create<store>((set) => ({
  restaurants: [],
  nextId: 11,
  editMode: false,
  categoryFilters: (() => {
    const filters = {} as CategoryFilterOption;
    Object.values(CATEGORY_FILTER_TYPE).forEach((category) => {
      filters[category] = true;
    });
    return filters;
  })(),
  mealTicketFilters: (() => {
    const filters = {} as MealTicketFilterOption;
    Object.values(MEALTICKT_FILTER_TYPE).forEach((mealTicket) => {
      filters[mealTicket] = true;
    });
    return filters;
  })(),

  toggleEditMode: () => 
    set((state) => ({
      editMode: !state.editMode
    })),
  setCategoryFilter: (category, checked) => 
    set((state) => ({
      categoryFilters: {
        ...state.categoryFilters,
        [category]: checked 
      }
    })),

  setMealTicketFilter: (mealTicket, checked) =>
    set((state) => ({
      mealTicketFilters: {
        ...state.mealTicketFilters,
        [mealTicket]: checked
      }
    })),
}));

export default useCustomStore;