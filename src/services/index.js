import axios from 'axios';

import { newsAPIKey, guardianAPIKey, nytAPIKey, defaultSearchValue } from '../utils/constants';

const createAxiosInstance = () => {
  return axios.create({
    headers: {
      'Content-type': 'application/json'
    },
    timeout: 900000,
  });
};

export const getNewsAPINews = async () => {
    try {
      const res = await createAxiosInstance().get(`https://newsapi.org/v2/everything?q=${defaultSearchValue}&sortBy=publishedAt&pageSize=10&apiKey=${newsAPIKey}`);
      return { articles: res?.data?.articles || [] };
    } catch (e) {
      throw {
        error: 'Error when retrieving data from News API'
    }
  };
}

export const getGuardianAPINews = async () => {
    try {
      const res = await createAxiosInstance().get(`https://content.guardianapis.com/search?q=${defaultSearchValue}&show-fields=byline&api-key=${guardianAPIKey}`);
      return { articles: res?.data?.response?.results || [] };
    } catch (e) {
      throw {
        error: 'Error when retrieving data from Guardian API'
    }
  };
}

export const getNYTAPINews = async () => {
    try {
      const res = await createAxiosInstance().get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${defaultSearchValue}&api-key=${nytAPIKey}`);
      return { articles: res?.data?.response?.docs || [] };
    } catch (e) {
      throw {
        error: 'Error when retrieving data from NYT API'
    }
  };
}