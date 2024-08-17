import { ADD_ARTICLES, PURGE_ARTICLES, FILTER_ARTICLES } from "../actionTypes/articlesActionTypes";

export const addArticles = (articles) => ({
  type: ADD_ARTICLES, 
  data: articles
});

export const purgeArticles = () => ({
  type: PURGE_ARTICLES, 
});

export const filterArticles = (articles) => ({
  type: FILTER_ARTICLES, 
  data: articles
});