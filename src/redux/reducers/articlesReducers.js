import { ADD_ARTICLES, PURGE_ARTICLES, FILTER_ARTICLES } from '../actionTypes/articlesActionTypes';

const initialState = { articles: [], filteredArticles: [] };

const articlesReducer = ( state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return {...state, articles: [...action.data], filteredArticles: [...action.data] };
    case PURGE_ARTICLES:
      return {articles: [], filteredArticles: [] };
    case FILTER_ARTICLES: 
      return {...state, filteredArticles: [...action.data]}
    default: 
      return state;
  }
}

export default articlesReducer;
export { initialState };
