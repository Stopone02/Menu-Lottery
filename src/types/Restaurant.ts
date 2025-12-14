import { CATEGORY_FILTER_TYPE, type MEALTICKT_FILTER_TYPE } from "../common/const";

export type MealticketFilterType = typeof MEALTICKT_FILTER_TYPE [keyof typeof MEALTICKT_FILTER_TYPE];

export type CategoryFilterType = typeof CATEGORY_FILTER_TYPE [keyof typeof CATEGORY_FILTER_TYPE];

export type CategoryFilterOption = {
  [key in CategoryFilterType]: boolean;
};

export type MealTicketFilterOption = {
  [key in MealticketFilterType]: boolean;
};

export interface Restaurant {
  id: number;
  name: string;
  mealTicket: MealticketFilterType;
  category: CategoryFilterType;
}