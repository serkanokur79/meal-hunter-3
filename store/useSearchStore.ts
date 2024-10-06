// store/useSearchStore.ts
import { Meal } from '@/app/types';
import { create } from 'zustand';

interface SearchState {
  selectedTab: string;
  searchText: string;
  searchTextForIngredient: string;
  selectedCategory: string;
  searchResults: Meal[];
  searchResultsByIngredient: Meal[];
  searchResultsByCategory: Meal[];
  setSelectedTab: (tab: string) => void;
  setSearchText: (text: string) => void;
  setSearchTextForIngredient: (text: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchResults: (results: Meal[]) => void;
  setSearchResultsByIngredient: (results: Meal[]) => void;
  setSearchResultsByCategory: (results: Meal[]) => void;
  selectedArea: string;
  searchResultsByArea: Meal[];
  setSelectedArea: (area: string) => void;
  setSearchResultsByArea: (results: Meal[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  selectedTab: 'random',
  searchText: '',
  searchTextForIngredient: '',
  selectedCategory: '',
  searchResults: [],
  searchResultsByIngredient: [],
  selectedArea: '',
  searchResultsByCategory: [],
  searchResultsByArea: [],
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setSearchText: (text) => set({ searchText: text }),
  setSearchTextForIngredient: (text) => set({ searchTextForIngredient: text }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedArea: (area) => set({ selectedArea: area }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchResultsByIngredient: (results) =>
    set({ searchResultsByIngredient: results }),
  setSearchResultsByCategory: (results) =>
    set({ searchResultsByCategory: results }),
  setSearchResultsByArea: (results) => set({ searchResultsByArea: results }),
}));
