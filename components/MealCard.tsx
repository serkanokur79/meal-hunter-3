'use client';

import { Card, CardContent } from './ui/card';

import Link from 'next/link';
import { Meal } from '@/app/types';
import { FavoriteButton } from './FavoriteButton';
import { Badge } from './ui/badge';

import { SignedIn } from '@clerk/nextjs';
import { ExternalLink } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <Card className="relative w-full h-64 overflow-hidden group">
     
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: `url(${meal.strMealThumb})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      <CardContent className="absolute inset-0 flex flex-col justify-end p-4 text-white">
      <Link href={`/meal/${meal.idMeal}`} passHref>
        <h3 className="text-xl font-bold mb-1 line-clamp-2">{meal.strMeal}</h3>
     
            <div className="flex gap-2 mt-2">
               {meal.strCategory && <Badge variant="secondary">{meal.strCategory}</Badge>}
               {meal.strArea  && <Badge variant="secondary">{meal.strArea}</Badge>}
            </div>
      
     </Link>
     <Link href={`/meal/${meal.idMeal}`} passHref  className="z-20 absolute top-2 right-2 text-white hover:scale-125 hover:z-20 transition-colors">
            <ExternalLink className='w-8 h-8'/>
        </Link>
    <SignedIn><FavoriteButton meal={meal} icon={true} /></SignedIn>
      </CardContent>
  
    </Card>
  );
};

export default MealCard;