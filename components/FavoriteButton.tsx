// app/components/FavoriteButton.tsx
'use client'

import { Meal } from '@/app/types'
import { useIsFavorite } from '@/hooks/useIsFavorite'

import { Button } from './ui/button';
import { HeartIcon } from 'lucide-react';
import { useToggleFavorite } from '@/hooks/use-toggle';


interface FavoriteButtonProps {
  meal: Meal
  icon: boolean
}

export function FavoriteButton({ meal, icon=true }: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(meal);
  
  const { toggleFavorite } = useToggleFavorite({
    meal,
    isFavorite
  });

  const handleToggleFavorite = () => {
    toggleFavorite();
  };


  if(icon){
    return (
      <Button
      variant="ghost"
      size="icon"
      className="z-20 absolute bottom-2 right-2 text-white hover:bg-transparent hover:text-red-800 transition-colors group"
      onClick={handleToggleFavorite}
      >
      <HeartIcon className={`h-6 w-6 group-hover:scale-125 ${isFavorite ? 'fill-red-800 text-red-950' : 'fill-slate-300'}` } />
      <span className="sr-only">{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
      </Button>
      
    ) 
  }

  return (
    <Button
      onClick={handleToggleFavorite}
      className={`w-[12rem] px-4 py-2 rounded ${
        isFavorite ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
      }`}
    >
      {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </Button>    
  )
}