import { useState, useMemo } from 'react'
import './App.css'
import CategoryFilter from './components/CategoryFilter'
import MealTicketFilter from './components/MealTicketFilter'
import RestaurantList from './components/RestaurantList'
import RandomPicker from './components/RandomPicker'
import type { CategoryFilterOption, MealTicketFilterOption, Restaurant } from './types/Restaurant'
import { CATEGORY_FILTER_TYPE, MEALTICKT_FILTER_TYPE } from './common/const'

// 예시 식당 데이터 (여기에 원하는 식당을 추가하세요)
const allRestaurants: Restaurant[] = [
  { id: 1, name: '김밥천국', mealTicket: 'AVAILABLE', category: 'KOREAN' },
  { id: 2, name: '맥도날드', mealTicket: 'AVAILABLE', category: 'FASTFOOD' },
  { id: 3, name: '스타벅스', mealTicket: 'AVAILABLE', category: 'CAFE' },
  { id: 4, name: '피자헛', mealTicket: 'AVAILABLE', category: 'WESTERN' },
  { id: 5, name: '서브웨이', mealTicket: 'AVAILABLE', category: 'FASTFOOD' },
  { id: 6, name: '본죽', mealTicket: 'AVAILABLE', category: 'KOREAN' },
  { id: 7, name: '파스타집', mealTicket: 'AVAILABLE', category: 'WESTERN' },
  { id: 8, name: '투썸플레이스', mealTicket: 'AVAILABLE', category: 'CAFE' },
  { id: 9, name: '삼겹살집', mealTicket: 'AVAILABLE', category: 'KOREAN' },
  { id: 10, name: '초밥집', mealTicket: 'AVAILABLE', category: 'JAPANESE' },
];

function App() {
  // 카테고리 목록 자동 추출
  const categories = useMemo(() => {
    const uniqueCategories = new Set(allRestaurants.map(r => r.category));
    return Array.from(uniqueCategories);
  }, []);

  // 식권 목록 자동 추출
  const mealTickets = useMemo(() => {
    const uniqueMealTickets = new Set(allRestaurants.map(r => r.mealTicket));
    return Array.from(uniqueMealTickets);
  }, []);

  const [categoryFilters, setCategoryFilters] = useState(() => {
    const filters = {} as CategoryFilterOption;
    Object.values(CATEGORY_FILTER_TYPE).forEach((category) => {
      filters[category] = true;
    })
    return filters;
  });

  const [mealTicketFilters, setMealTicketFilters] = useState(() => {
    const filters = {} as MealTicketFilterOption;
    Object.values(MEALTICKT_FILTER_TYPE).forEach((mealTicket) => {
      filters[mealTicket] = true;
    })
    return filters;
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // 필터링된 식당 목록
  const filteredRestaurants = useMemo(() => {
    return allRestaurants.filter(restaurant =>
      categoryFilters[restaurant.category] && mealTicketFilters[restaurant.mealTicket]
    );
  }, [categoryFilters, mealTicketFilters]);

  // 카테고리 필터 변경 핸들러
  const handleCategoryFilterChange = (category: string, checked: boolean) => {
    setCategoryFilters(prev => ({
      ...prev,
      [category]: checked
    }));
  };

  // 식권 필터 변경 핸들러
  const handleMealTicketFilterChange = (mealTicket: string, checked: boolean) => {
    setMealTicketFilters(prev => ({
      ...prev,
      [mealTicket]: checked
    }));
  };

  // 랜덤 추첨 핸들러
  const handleRandomPick = () => {
    if (filteredRestaurants.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredRestaurants.length);
      setSelectedRestaurant(filteredRestaurants[randomIndex]);
    }
  };

  return (
    <div className="app">
      <h1>식당 추첨기</h1>

      <CategoryFilter
        categories={categories}
        filters={categoryFilters}
        onFilterChange={handleCategoryFilterChange}
      />

      <MealTicketFilter
        mealTickets={mealTickets}
        filters={mealTicketFilters}
        onFilterChange={handleMealTicketFilterChange}
      />

      <RestaurantList restaurants={filteredRestaurants} />

      <RandomPicker
        restaurants={filteredRestaurants}
        onPick={handleRandomPick}
        selectedRestaurant={selectedRestaurant}
      />
    </div>
  )
}

export default App
