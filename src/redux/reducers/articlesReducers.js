import { ADD_ARTICLES } from '../actionTypes/articlesActionTypes';

const initialState = { articles: [] };

const articlesReducer = ( state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLES: {
      return {...state, articles: [...state.articles, ...action.data] }
    }
    default: 
      return state
  }
}

export default articlesReducer;
export { initialState };