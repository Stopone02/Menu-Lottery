import { Restaurant } from '../types/Restaurant';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export default function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <div className="restaurant-list">
      <h3>식당 목록 ({restaurants.length}개)</h3>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <span className="restaurant-name">{restaurant.name}</span>
            <span className="restaurant-category">({restaurant.category})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
