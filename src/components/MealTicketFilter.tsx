import type { MealTicketFilterOption, MealticketFilterType } from '../types/Restaurant';

interface MealTicketFilterProps {
  mealTickets: MealticketFilterType[];
  filters: MealTicketFilterOption;
  onFilterChange: (mealTicket: string, checked: boolean) => void;
}

export default function MealTicketFilter({ mealTickets, filters, onFilterChange }: MealTicketFilterProps) {
  return (
    <div className="meal-ticket-filter">
      <h3>식권 사용 가능 여부</h3>
      <div className="filter-options">
        {mealTickets.map((mealTicket) => (
          <label key={mealTicket} className="filter-option">
            <input
              type="checkbox"
              checked={filters[mealTicket]}
              onChange={(e) => onFilterChange(mealTicket, e.target.checked)}
            />
            <span>{mealTicket === 'AVAILABLE' ? '사용 가능' : '사용 불가'}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
