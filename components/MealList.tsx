'use client';

import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { LayoutGrid, Table, Grid3X3 } from 'lucide-react';
import MealTable from './MealTable';
import MealCardNew from './MealCardNew';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import MealCard from './MealCard';
// import MealCard from './MealCard';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

export default function MealList({
  meals,
  title,
}: {
  meals: Meal[];
  title: string;
}) {
  const [view, setView] = useState<'small' | 'medium' | 'list'>('medium');
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  if (!meals || meals.length === 0) {
    return <p className="mt-4">No meals found. Try a different search term.</p>;
  }

  const totalPages = Math.ceil(meals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMeals = meals.slice(startIndex, endIndex);

  return (
    <div className='mt-4'>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-center gap-4">
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(value) =>
                setView(value as 'small' | 'medium' | 'list')
              }
            >
              <ToggleGroupItem value="small" aria-label="Small grid view">
                <Grid3X3 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="medium" aria-label="Medium grid view">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <Table className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Results per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6 per page</SelectItem>
              <SelectItem value="12">12 per page</SelectItem>
              <SelectItem value="24">24 per page</SelectItem>
              <SelectItem value="48">48 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {view === 'list' ? (
        <MealTable meals={currentMeals} />
      ) : (
        <div
          className={`grid gap-6 ${view === 'small' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}
        >
          {currentMeals.map((meal) => (
            <>
              {/* <MealCardNew key={meal.idMeal} meal={meal} size={view} /> */}
              <MealCard key={meal.idMeal} meal={meal} size={view} />
            </>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>
    </div>
  );
}
