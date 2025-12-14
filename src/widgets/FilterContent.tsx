import CategoryFilter from "../components/CategoryFilter";
import MealTicketFilter from "../components/MealTicketFilter";

export function FilterContent() {
  return (
    <div className="grid grid-cols-[3fr_7fr] gap-4">
      <MealTicketFilter />
      <CategoryFilter />
    </div>
  )
}