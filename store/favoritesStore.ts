import { Meal } from '@/app/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Meal[];
  setFavorites: (favors: Meal[]) => void;
  addFavorite: (favorite: Meal) => void;
  removeFavorite: (id: string) => void;
}

const useFavoritesStore = create(
  persist<FavoritesState>(
    (set) => ({
      favorites: [],
      setFavorites: (favors) =>
        set(() => ({
          favorites: favors,
        })),
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [...state.favorites, favorite],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.idMeal !== id),
        })),
    }),
    {
      name: 'favorites-storage', // unique name
    }
  )
);

export default useFavoritesStore;
