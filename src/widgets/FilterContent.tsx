import type { Restaurant } from "@/common/types/Restaurant";
import CategoryFilter from "./CategoryFilter";
import MealTicketFilter from "./MealTicketFilter";

export function FilterContent({ restaurants }: { restaurants: Restaurant[]}) {
  return (
    <div className="max-w-[600px] w-full grid grid-cols-2 gap-4">
      <MealTicketFilter restaurants={restaurants} />
      <CategoryFilter restaurants={restaurants} />
    </div>
  )
}