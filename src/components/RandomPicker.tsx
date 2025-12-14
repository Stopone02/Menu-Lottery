import { Restaurant } from '../types/Restaurant';

interface RandomPickerProps {
  restaurants: Restaurant[];
  onPick: () => void;
  selectedRestaurant: Restaurant | null;
}

export default function RandomPicker({ restaurants, onPick, selectedRestaurant }: RandomPickerProps) {
  return (
    <div className="random-picker">
      <button
        className="pick-button"
        onClick={onPick}
        disabled={restaurants.length === 0}
      >
        {restaurants.length === 0 ? '선택 가능한 식당이 없습니다' : '식당 추첨하기!'}
      </button>

      {selectedRestaurant && (
        <div className="selected-restaurant">
          <h2>오늘의 식당은...</h2>
          <div className="restaurant-card">
            <p className="restaurant-name">{selectedRestaurant.name}</p>
            <p className="restaurant-category">{selectedRestaurant.category}</p>
          </div>
        </div>
      )}
    </div>
  );
}
