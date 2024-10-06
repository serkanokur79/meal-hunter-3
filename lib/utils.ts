import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Meal } from '@/app/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createIngredientMeasurePairs(meal: Meal) {
  const pairs = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Meal;
    const measureKey = `strMeasure${i}` as keyof Meal;

    const ingredient = meal[ingredientKey];
    const measure = meal[measureKey];

    if (typeof ingredient === 'string' && ingredient.trim() !== '') {
      pairs.push({
        ingredient: ingredient.trim(),
        measure: typeof measure === 'string' ? measure.trim() : '',
      });
    }
  }

  return pairs;
}
