import { useEffect, useState } from 'react';
import useFavoritesStore from '@/store/favoritesStore';
import { Meal } from '@/app/types';

export const useIsFavorite = (meal: Meal) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites } = useFavoritesStore();

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.idMeal === meal.idMeal));
  }, [favorites, meal.idMeal]);

  return isFavorite;
};
