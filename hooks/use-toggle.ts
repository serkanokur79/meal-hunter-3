import useFavoritesStore from '@/store/favoritesStore';
import {
  addFavoriteToDB,
  removeFavoriteFromDB,
} from '@/app/actions/mealActions';
import { Meal } from '@/app/types';

interface UseToggleFavoriteParams {
  meal: Meal;
  isFavorite: boolean;
}

export const useToggleFavorite = ({
  meal,
  isFavorite,
}: UseToggleFavoriteParams) => {
  const { addFavorite, removeFavorite } = useFavoritesStore();

  const toggleFavorite = async (): Promise<void> => {
    try {
      if (isFavorite) {
        await removeFavoriteFromDB(meal.idMeal);
        removeFavorite(meal.idMeal);
      } else {
        await addFavoriteToDB(meal);
        addFavorite(meal);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return { toggleFavorite };
};
