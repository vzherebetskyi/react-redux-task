import { ADD_ARTICLES } from "../actionTypes/articlesActionTypes";

export const addArticles = (articles) => ({
  type: ADD_ARTICLES, 
  data: articles
});