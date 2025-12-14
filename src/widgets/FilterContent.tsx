import CategoryFilter from "../components/CategoryFilter";
import MealTicketFilter from "../components/MealTicketFilter";

export function FilterContent() {
  return (
    <div className="max-w-[600px] w-full grid grid-cols-2 gap-4">
      <MealTicketFilter />
      <CategoryFilter />
    </div>
  )
}