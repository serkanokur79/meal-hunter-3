'use server';
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMealByName(name: string) {
  const response = await fetch(`${API_BASE_URL}/search.php?s=${name}`);
  return response.json();
}

export async function getRandomMeal() {
  const response = await fetch(`${API_BASE_URL}/random.php`);
  return response.json();
}

export async function getMealCategories() {
  const response = await fetch(`${API_BASE_URL}/categories.php`);
  return response.json();
}

export async function getMealAreas() {
  const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
  return response.json();
}

export async function getMealsByCategory(category: string) {
  const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);
  return response.json();
}

export async function getMealsByArea(area: string) {
  const response = await fetch(`${API_BASE_URL}/filter.php?a=${area}`);
  return response.json();
}

export async function getMealByIngredient(ingredient: string) {
  const ingredient_ = ingredient.trim().replace(' ', '_');
  const response = await fetch(`${API_BASE_URL}/filter.php?i=${ingredient_}`);
  return response.json();
}
