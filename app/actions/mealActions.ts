'use server';

import { db } from '@/utils/firebase';
import { auth } from '@clerk/nextjs/server';
import {
  deleteDoc,
  addDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
} from 'firebase/firestore';

import { Meal } from '@/app/types';
export async function searchMeals(query: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  return data.meals || [];
}

export async function searchMealbyId(id: string) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  return data.meals || [];
}

export async function addFavoriteToDB(meal: Meal) {
  const { userId } = auth();

  if (!userId) throw new Error('User not authenticated');

  await addDoc(collection(db, 'favorites'), {
    userId,
    meal,
    createdAt: new Date(),
  });
}

export async function removeFavoriteFromDB(mealId: string) {
  const { userId } = auth();
  if (!userId) throw new Error('User not authenticated');

  const q = query(
    collection(db, 'favorites'),
    where('userId', '==', userId),
    where('meal.idMeal', '==', mealId),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    snapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  }
}

export async function getFavorites() {
  const { userId } = auth();
  if (!userId) return [];

  const q = query(collection(db, 'favorites'), where('userId', '==', userId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data().meal) || [];
}
