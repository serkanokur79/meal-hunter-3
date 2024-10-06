'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchStore } from '@/store/useSearchStore';
import {
  getMealAreas,
  getMealByIngredient,
  getMealCategories,
  getMealsByArea,
  getMealsByCategory,
  getRandomMeal,
  searchMealByName,
} from './services/mealServices';
import { Area, Category, Meal } from './types';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MealList from '@/components/MealList';
import MealComponent from '@/components/MealPage';

export default function Home() {
  const {
    selectedTab,
    searchText,
    searchTextForIngredient,
    selectedCategory,
    searchResults,
    searchResultsByIngredient,
    searchResultsByCategory,
    setSelectedTab,
    setSearchText,
    setSearchTextForIngredient,
    setSelectedCategory,
    setSearchResults,
    setSearchResultsByIngredient,
    setSearchResultsByCategory,
    selectedArea,
    setSelectedArea,
    setSearchResultsByArea,
    searchResultsByArea
  } = useSearchStore();

  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);


  const handleSearch = async () => {
    try {
      const mealData = await searchMealByName(searchText);
      setSearchResults(mealData.meals || []);
    } catch (error) {
      console.error('Error searching meals:', error);
    }
  };

  const handleCategorySelect = async (category: string) => {
    setSelectedCategory(category);
    try {
      const results = await getMealsByCategory(category);
      setSearchResultsByCategory(results.meals || []);
    } catch (error) {
      console.error('Error fetching meals by category:', error);
    }
  };
  const handleAreaSelect = async (area: string) => {
    setSelectedArea(area);
    try {
      const results = await getMealsByArea(area);
      setSearchResultsByArea(results.meals || []);
    } catch (error) {
      console.error('Error fetching meals by area:', error);
    }
  };



  const handleSearchForIngredient = async (ingredient: string) => {
    try {
      const results = await getMealByIngredient(ingredient);
      setSearchResultsByIngredient(results.meals || []);
    } catch (error) {
      console.error('Error searching by ingredient:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomMealData = await getRandomMeal();
        setRandomMeal(randomMealData.meals?.[0]);
        const categoriesData = await getMealCategories();
        setCategories(categoriesData.categories || []);
        const areasData = await getMealAreas();
        setAreas(areasData.meals || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-2 container mx-auto py-2">
      <section className="mb-2">
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="random">Random Meal</TabsTrigger>
            <TabsTrigger value="name">Search by Name</TabsTrigger>
            <TabsTrigger value="ingredient">Search by Ingredient</TabsTrigger>
            <TabsTrigger value="category">Browse Categories</TabsTrigger>
            <TabsTrigger value="area">Browse Areas</TabsTrigger>
          </TabsList>
          <TabsContent value="random">
            <Suspense fallback={<div>Loading...</div>}>
              {randomMeal && <MealComponent meal={randomMeal} />}
            </Suspense>
          </TabsContent>
          <TabsContent value="name">
            <div className="mt-4 flex flex-row gap-2">
              <Input
                type="search"
                placeholder="Enter meal name..."
                value={searchText}
                className="flex-1"
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button type="submit" onClick={handleSearch}>
                Search
              </Button>
            </div>
            {searchResults.length > 0 && (
              <section className="mb-12">
                <MealList meals={searchResults} title={`Displaying results for ${searchText}`} />
              </section>
            )}
          </TabsContent>
          <TabsContent value="ingredient">
            <div className="mt-4 flex flex-row gap-2">
              <Input
                type="search"
                placeholder="Enter ingredient..."
                value={searchTextForIngredient}
                onChange={(e) => setSearchTextForIngredient(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchForIngredient(searchTextForIngredient)}
              />
              <Button type="submit" onClick={() => handleSearchForIngredient(searchTextForIngredient)}>
                Search
              </Button>
            </div>
            {searchResultsByIngredient.length > 0 && (
              <section className="mb-12">
                <MealList meals={searchResultsByIngredient} title={`Displaying results for ingredient: ${searchTextForIngredient}`} />
              </section>
            )}
          </TabsContent>
          <TabsContent value="category">
            <div className="mt-4 flex flex-row gap-2">
              <Select onValueChange={handleCategorySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.idCategory} value={category.strCategory}>
                      {category.strCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {searchResultsByCategory.length > 0 && (
              <section className="mb-12">
                <MealList meals={searchResultsByCategory} title={`Displaying results for category: ${selectedCategory}`} />
              </section>
            )}
          </TabsContent>
          <TabsContent value="area">
            <div className="mt-4 flex flex-row gap-2">
              <Select onValueChange={handleAreaSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an area" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.strArea} value={area.strArea}>
                      {area.strArea}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {searchResultsByArea.length > 0 && (
              <section className="mb-12">
                <MealList meals={searchResultsByArea} title={`Displaying results for area: ${selectedArea}`} />
              </section>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
