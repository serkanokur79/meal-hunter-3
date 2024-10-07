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
import { Menu, RefreshCw, Search, SearchIcon } from 'lucide-react';
import MealDetailSkeleton from '@/components/MealDetailSkeleton';
import MealListSkeleton from '@/components/MealListSkeleton';
import RedAlert from '@/components/red-alert';

export default function Home() {
  const {
    selectedTab,
    searchText,
    searchedText,
    searchTextForIngredient,
    searchedTextForIngredient,
    selectedCategory,
    searchResults,
    searchResultsByIngredient,
    searchResultsByCategory,
    setSelectedTab,
    setSearchText,
    setSearchedText,
    setSearchTextForIngredient,
    setSearchedTextForIngredient,
    setSelectedCategory,
    setSearchResults,
    setSearchResultsByIngredient,
    setSearchResultsByCategory,
    selectedArea,
    setSelectedArea,
    setSearchResultsByArea,
    searchResultsByArea,
  } = useSearchStore();

  const [randomMeal, setRandomMeal] = useState<Meal | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchForIngredientsLoading, setSearchForIngredientsLoading] =
    useState(false);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const mealData = await searchMealByName(searchText);
      setSearchedText(searchText);
      setSearchResults(mealData.meals || []);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
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
    setSearchForIngredientsLoading(true);
    try {
      const results = await getMealByIngredient(ingredient);
      setSearchedTextForIngredient(ingredient);
      setSearchResultsByIngredient(results.meals || []);
      setSearchForIngredientsLoading(false);
    } catch (error) {
      console.error('Error searching by ingredient:', error);
      setSearchForIngredientsLoading(false);
    }
  };

  const getNewRandomMeal = async () => {
    setRandomMeal(null);
    try {
      const randomMealData = await getRandomMeal();
      setRandomMeal(randomMealData.meals?.[0]);
    } catch (error) {
      console.error('Error fetching random meal:', error);
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
    <div className="flex flex-col gap-2 container mx-auto py-2 text-sm md:text-base">
      <section className="mb-2 container">
        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5 ">
            <TabsTrigger value="random" onClick={() => getNewRandomMeal()}>
              <RefreshCw className="hidden md:block w-4 h-4 mr-2" />
              Random
            </TabsTrigger>
            <TabsTrigger value="name">
              <Search className="hidden md:block w-4 h-4 mr-2" />
              Name
            </TabsTrigger>
            <TabsTrigger value="ingredient">
              <Search className="hidden md:block w-4 h-4 mr-2" /> Ingredient
            </TabsTrigger>
            <TabsTrigger value="category">
              <Menu className="hidden md:block w-4 h-4 mr-2" />
              Category
            </TabsTrigger>
            <TabsTrigger value="area">
              {' '}
              <Menu className="hidden md:block w-4 h-4 mr-2" />
              Area
            </TabsTrigger>
          </TabsList>
          <TabsContent value="random">
            <Suspense fallback={<MealDetailSkeleton />}>
              {!randomMeal && <MealDetailSkeleton />}
              {randomMeal && (
                <MealComponent meal={randomMeal} key={randomMeal.idMeal} />
              )}
            </Suspense>
          </TabsContent>
          <TabsContent value="name">
            <div className="mt-4 flex flex-row gap-1 mx-2 md:mx-4">
              <Input
                type="search"
                placeholder="Enter meal name..."
                value={searchText}
                className="flex-grow"
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button type="submit" onClick={handleSearch}>
                <SearchIcon className="w-4 h-4 md:hidden" />
                <span className="hidden md:block">Search</span>
              </Button>
            </div>
            {searchText === '' ? (
              <div className="text-center text-gray-500 mt-8">
                Enter a meal name and click Search to begin
              </div>
            ) : searchResults === null ? (
              searchLoading ? (
                <MealListSkeleton />
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  Enter a meal name and click Search to begin
                </div>
              )
            ) : searchResults.length === 0 ? (
              <RedAlert
                text={' No meals found. Try a different search term.'}
              />
            ) : (
              <MealList
                meals={searchResults}
                title={`Showing results for meal "${searchedText}"`}
              />
            )}
          </TabsContent>
          <TabsContent value="ingredient">
            <div className="mt-4 flex flex-row gap-1 mx-2 md:mx-4">
              <Input
                type="search"
                placeholder="Enter ingredient..."
                value={searchTextForIngredient}
                onChange={(e) => setSearchTextForIngredient(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  handleSearchForIngredient(searchTextForIngredient)
                }
              />
              <Button
                type="submit"
                onClick={() =>
                  handleSearchForIngredient(searchTextForIngredient)
                }
              >
                <SearchIcon className="w-4 h-4 md:hidden" />
                <span className="hidden md:block">Search</span>
              </Button>
            </div>

            {searchTextForIngredient === '' ? (
              <div className="text-center text-gray-500 mt-8">
                Enter a meal name and click Search to begin
              </div>
            ) : searchResultsByIngredient === null ? (
              searchForIngredientsLoading ? (
                <MealListSkeleton />
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  Enter a meal name and click Search to begin
                </div>
              )
            ) : searchResultsByIngredient.length === 0 ? (
              <div className="text-center text-red-500 mt-8">
                No meals found. Try a different search term.
              </div>
            ) : (
              <MealList
                meals={searchResultsByIngredient}
                title={`Showing results for ingredient "${searchedTextForIngredient}"`}
              />
            )}
          </TabsContent>
          <TabsContent value="category">
            <div className="m-4">
              <Select onValueChange={handleCategorySelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.idCategory}
                      value={category.strCategory}
                    >
                      {category.strCategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory === '' ? (
              <div className="text-center text-gray-500 mt-8">
                Select a category to filter meals
              </div>
            ) : searchResultsByCategory === null ? (
              <div className="text-center text-gray-500 mt-8">Searching...</div>
            ) : searchResultsByCategory.length === 0 ? (
              <div className="text-center text-red-500 mt-8">
                No meals found. Try a different category.
              </div>
            ) : (
              <MealList
                meals={searchResultsByCategory}
                title={'Showing results for ' + selectedCategory}
              />
            )}
          </TabsContent>
          <TabsContent value="area">
            <div className="m-4">
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
            {selectedArea === '' ? (
              <div className="text-center text-gray-500 mt-8">
                Select a category to filter meals
              </div>
            ) : searchResultsByArea === null ? (
              <div className="text-center text-gray-500 mt-8">Searching...</div>
            ) : searchResultsByArea.length === 0 ? (
              <div className="text-center text-red-500 mt-8">
                No meals found. Try a different category.
              </div>
            ) : (
              <MealList
                meals={searchResultsByArea}
                title={'Showing results for ' + selectedArea}
              />
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
