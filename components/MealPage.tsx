'use client';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { FavoriteButton } from './FavoriteButton';
import type { Meal } from '@/app/types';
import VideoPlayer from './VideoPlayer';
import { SignedIn } from '@clerk/nextjs';
import {
  Book,
  ChefHat,
  ExternalLink,
  TvMinimalPlayIcon,
  UtensilsCrossed,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface MealComponentProps {
  meal: Meal;
}

export function MealComponent({ meal }: MealComponentProps) {
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith('strIngredient') && meal[key])
    .map((key) => {
      const index = key.slice(13);

      return {
        ingredient: meal[key],
        measure: meal[`strMeasure${index}`],
        image: `https://www.themealdb.com/images/ingredients/${meal[key]}-Small.png`,
      };
    });

  return (
    <div className="container mx-auto p-4 bg-cover bg-center text-sm xl:text-base">
      <div className="grid md:grid-cols-2 gap-4 md:divide-x-2 md:divide-solid">
      <div className="flex flex-col h-full gap-1">
          <Card className="h-full">
            <CardContent className=" px-6 py-4 h-full flex flex-col">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={500}
              height={300}
              priority
              className="object-cover w-full h-auto hover:scale-105 transition-transform duration-300"
            />
            <h1 className="absolute bottom-16 left-4 text-white text-lg xl:text-3xl font-bold mb-2 bg-slate-800/40 p-2 shadow-red-900">
              {meal.strMeal}
            </h1>
            <div className="absolute bottom-2 left-4 flex flex-wrap gap-2 mb-4">
              <Badge variant="default">{meal.strCategory}</Badge>
              <Badge variant="secondary">{meal.strArea}</Badge>
              {meal?.strTags?.split(',').map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <SignedIn>
              {' '}
              <FavoriteButton meal={meal} icon={true} />
            </SignedIn>
          </div>
          {meal.strSource && (
            <div className="mb-2 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <Book className="mr-2" /> Recipe Source
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Discover more about this recipe from its original source:
              </p>
              <Link
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  View Original Recipe <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
          </CardContent>
          </Card>
        </div>
   
        <div className="flex flex-col h-full md:pl-4">
          <Card className="h-full">
            <CardContent className=" px-6 py-4 h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <UtensilsCrossed className="mr-2" /> Ingredients
              </h3>
              <div className="flex flex-col h-full w-full">
                <ol className="list-none list-inside gap-y-2 gap-x-4 grid grid-cols-2 ">
                  {ingredients.map(({ ingredient, measure, image }, index) => (
                    <li
                      key={index}
                      className="flex flex-row gap-2 justify-start items-center"
                    >
                      <Image
                        src={image}
                        alt={ingredient}
                        width={50}
                        height={50}
                        className="w-10 h-10 md:w-12 md:h-12"
                      />
                      <div className="flex-grow">
                        {ingredient && (
                          <p className="font-medium">{ingredient}</p>
                        )}
                        {measure && (
                          <p className="text-sm text-muted-foreground">
                            {measure}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className=" hidden md:block md:my-8" />

      <div className="grid md:grid-cols-2 gap-4 md:divide-x-2 md:divide-solid">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <ChefHat className="mr-2" /> Instructions
            </h3>
          </CardHeader>
          <CardContent className="p-2 px-6">
            <p className="whitespace-pre-line">{meal.strInstructions}</p>
          </CardContent>
        </Card>
        <div className='md:pl-4'>
        <Card className=''>
          <CardHeader>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <TvMinimalPlayIcon className="mr-2" /> Video Tutorial
            </h3>
          </CardHeader>
          <CardContent className="px-6">
            <div className="aspect-video rounded-lg overflow-hidden flex flex-col justify-start items-start">
              <VideoPlayer
                url={meal.strYoutube}
                thumbnail={meal.strMealThumb}
                name={meal.strMeal}
              />
            </div>
          </CardContent>
        </Card></div>
      </div>
    </div>
  );
}
export default MealComponent;
