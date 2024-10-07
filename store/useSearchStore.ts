import { Meal } from '@/app/types';
import { create } from 'zustand';

interface SearchState {
  selectedTab: string;
  searchText: string;
  searchTextForIngredient: string;
  searchedText: string;
  searchedTextForIngredient: string;
  selectedCategory: string;
  searchResults: Meal[] | null;
  searchResultsByIngredient: Meal[] | null;
  searchResultsByCategory: Meal[] | null;
  searchResultsByArea: Meal[] | null;
  selectedArea: string;
  setSelectedTab: (tab: string) => void;
  setSearchText: (text: string) => void;
  setSearchTextForIngredient: (text: string) => void;
  setSearchedText: (text: string) => void;
  setSearchedTextForIngredient: (text: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchResults: (results: Meal[] | null) => void;
  setSearchResultsByIngredient: (results: Meal[] | null) => void;
  setSearchResultsByCategory: (results: Meal[] | null) => void;
  setSelectedArea: (area: string) => void;
  setSearchResultsByArea: (results: Meal[] | null) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  selectedTab: 'random',
  searchText: '',
  searchTextForIngredient: '',
  selectedCategory: '',
  searchResults: null,
  searchResultsByIngredient: null,
  searchResultsByCategory: null,
  searchResultsByArea: null,
  selectedArea: '',
  searchedText: '',
  searchedTextForIngredient: '',
  setSelectedTab: (tab) => set({ selectedTab: tab }),
  setSearchText: (text) =>
    set((state) => ({
      searchText: text,
      searchResults: text === '' ? null : state.searchResults,
    })),
  setSearchedText: (text) => set({ searchedText: text }),
  setSearchedTextForIngredient: (text) =>
    set({ searchedTextForIngredient: text }),
  setSearchTextForIngredient: (text) =>
    set((state) => ({
      searchTextForIngredient: text,
      searchResultsByIngredient:
        text === '' ? null : state.searchResultsByIngredient,
    })),
  setSelectedCategory: (category) =>
    set((state) => ({
      selectedCategory: category,
      searchResultsByCategory:
        category === '' ? null : state.searchResultsByCategory,
    })),
  setSelectedArea: (area) =>
    set((state) => ({
      selectedArea: area,
      searchResultsByArea: area === '' ? null : state.searchResultsByArea,
    })),
  setSearchResults: (results) => set({ searchResults: results }),
  setSearchResultsByIngredient: (results) =>
    set({ searchResultsByIngredient: results }),
  setSearchResultsByCategory: (results) =>
    set({ searchResultsByCategory: results }),
  setSearchResultsByArea: (results) => set({ searchResultsByArea: results }),
}));
