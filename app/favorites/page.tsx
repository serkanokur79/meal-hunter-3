// app/favorites/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { Meal } from '../types';
import { getFavorites } from '../actions/mealActions';
import useFavoritesStore from '@/store/favoritesStore';
import MealList from '@/components/MealList';
import MealListSkeleton from '@/components/MealListSkeleton';
import { FileHeart } from 'lucide-react';

function FavoritesPage() {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const { setFavorites } = useFavoritesStore();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await getFavorites();
        console.log('response:', response);
        setFavoriteMeals(response);
        setFavorites(response);
        localStorage.setItem('favorites-storage', JSON.stringify(response));
      } catch (error) {
        console.error('Failed to fetch favorite meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return  <div className="container mx-auto"><MealListSkeleton /></div>;
  }

  if (favoriteMeals.length === 0) {
    return <div>No favorite meals found. Please add some favorites.</div>;
  }

  return (
    <div className="container mx-auto">
        <h3 className="text-lg font-semibold my-4 flex items-center">
              <FileHeart  className="mr-2" /> Your Favorite Meals
            </h3>
      <MealList meals={favoriteMeals} title={'Displaying your favorite meals'} />
    </div>
  );
}
export default FavoritesPage;
