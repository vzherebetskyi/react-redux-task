import { UPDATE_SEARCH } from "../actionTypes/filtersActionTypes";

const initialState = { searchValue: '' };

const filtersReducer = ( state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH: {
      return {...state, searchValue: action.data }
    }
    default: 
      return state
  }
}

export default filtersReducer;
export { initialState };