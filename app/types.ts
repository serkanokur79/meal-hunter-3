export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strTags: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  // strIngredient1: string;
  // strMeasure1: string;
  // strIngredient2: string;
  // strMeasure2: string;
  // strIngredient3: string;
  // strMeasure3: string;
  // strIngredient4: string;
  // strMeasure4: string;
  // strIngredient5: string;
  // strMeasure5: string;
  // strIngredient6: string | null;
  // strMeasure6: string | null;
  // strIngredient7: string | null;
  // strMeasure7: string | null;
  // strIngredient8: string | null;
  // strMeasure8: string | null;
  // strIngredient9: string | null;
  // strMeasure9: string | null;
  // strIngredient10: string | null;
  // strMeasure10: string | null;
  // strIngredient11: string | null;
  // strMeasure11: string | null;
  // strIngredient12: string | null;
  // strMeasure12: string | null;
  // strIngredient13: string | null;
  // strMeasure13: string | null;
  // strIngredient14: string | null;
  // strMeasure14: string | null;
  // strIngredient15: string | null;
  // strMeasure15: string | null;
  // strIngredient16: string | null;
  // strMeasure16: string | null;
  // strIngredient17: string | null;
  // strMeasure17: string | null;
  // strIngredient18: string | null;
  // strMeasure18: string | null;
  // strIngredient19: string | null;
  // strMeasure19: string | null;
  // strIngredient20: string | null;
  // strMeasure20: string | null;
  [key: string]: string;
  // Add other properties as needed
}

export interface Category {
  idCategory: string;
  strCategory: string;
}

export interface Area {
  strArea: string;
}
