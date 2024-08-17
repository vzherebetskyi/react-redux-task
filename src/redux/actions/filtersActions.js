import { UPDATE_SEARCH, UPDATE_FILTERS } from '../actionTypes/filtersActionTypes';

export const updateSearch = (searchValue) => ({
  type: UPDATE_SEARCH,
  data: searchValue,
});

export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  data: filters,
});
