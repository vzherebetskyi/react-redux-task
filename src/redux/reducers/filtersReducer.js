import { UPDATE_SEARCH, UPDATE_FILTERS } from "../actionTypes/filtersActionTypes";

const initialState = { searchValue: '', filters: {} };

const filtersReducer = ( state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return {...state, searchValue: action.data };
    case UPDATE_FILTERS:
      return {...state, filters: action.data };
    default: 
      return state
  }
}

export default filtersReducer;
export { initialState };