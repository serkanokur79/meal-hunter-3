import { MealComponent } from '@/components/MealPage';
import { searchMealbyId } from '../../actions/mealActions';
import { Meal } from '@/app/types';

export default async function MealPage({ params }: { params: { id: string } }) {
  const meals = await searchMealbyId(params.id);
  const meal = meals[0] as Meal;

  if (!meal) {
    return <div>Meal not found</div>;
  }

  return <MealComponent meal={meal} />;
}
