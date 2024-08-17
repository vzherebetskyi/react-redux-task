import axios from 'axios';
import { toast } from 'react-toastify';

import { newsAPIKey, guardianAPIKey, nytAPIKey, defaultSearchValue, PREFERRED_SOURCES, PREFERRED_CATEGORIES, PREFERRED_AUTHORS } from '../utils/constants';
import { getLocallyStoredData } from '../utils/helpers';

const createAxiosInstance = () => {
  return axios.create({
    headers: {
      'Content-type': 'application/json'
    },
    timeout: 900000,
  });
};

export const getNewsAPINews = async (searchValue) => {
    try {
      
      let baseQuery = `https://newsapi.org/v2/everything?q=${searchValue ? searchValue : defaultSearchValue}&sortBy=publishedAt&pageSize=10&apiKey=${newsAPIKey}`;
      
      const preferredSources = getLocallyStoredData(PREFERRED_SOURCES);
      if (preferredSources && preferredSources.length > 0) {
        baseQuery += '&sources=' + preferredSources.map((el, idx) => idx !== preferredSources.length - 1 ? el.toLowerCase().split(' ').join('-') + ',' : el.toLowerCase().split(' ').join('-')).join('');
      }
      
      const res = await createAxiosInstance().get(baseQuery);
      
      return { articles: res?.data?.articles || [] };
    } catch (e) {
      toast.error(`Error when retrieving data from News API. ${e.message}`);
      throw {
        error: 'Error when retrieving data from News API'
    }
  };
}

export const getGuardianAPINews = async (searchValue) => {
    try {
      
      let baseQuery = `https://content.guardianapis.com/search?q=${searchValue ? searchValue : defaultSearchValue}&show-fields=byline&api-key=${guardianAPIKey}`;
      
      const preferredSources = getLocallyStoredData(PREFERRED_SOURCES);
      if (preferredSources && preferredSources.length > 0) {
        if (!JSON.stringify(preferredSources).toLowerCase().includes('guardian')) {
          return { articles: [] };
        }
      }
      
      const res = await createAxiosInstance().get(baseQuery);
      
      return { articles: res?.data?.response?.results || [] };
    } catch (e) {
      toast.error(`Error when retrieving data from Guardian API. ${e.message}`);
      throw {
        error: 'Error when retrieving data from Guardian API'
    }
  };
}

export const getNYTAPINews = async (searchValue) => {
    try {

      let baseQuery = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchValue ? searchValue : defaultSearchValue}&api-key=${nytAPIKey}`;
      
      const preferredSources = getLocallyStoredData(PREFERRED_SOURCES);
      if (preferredSources && preferredSources.length > 0) {
        if (!JSON.stringify(preferredSources).toLowerCase().includes('nyt') && !JSON.stringify(preferredSources).toLowerCase().includes('new york times')) {
          return { articles: [] };
        }
      }

      const preferredCategories = getLocallyStoredData(PREFERRED_CATEGORIES);
      if  (preferredCategories && preferredCategories.length > 0) {
        baseQuery += '&fq=news_desk:(' + preferredCategories.join(', ') + ')';
      }

      const preferredAuthors = getLocallyStoredData(PREFERRED_AUTHORS);
      if  (preferredAuthors && preferredAuthors.length > 0) {
        baseQuery += '&fq=persons:(' + preferredAuthors.join(', ') + ')';
      }

      const res = await createAxiosInstance().get(baseQuery);

      return { articles: res?.data?.response?.docs || [] };
    } catch (e) {
      toast.error(`Error when retrieving data from NYT API. ${e.message}`);
      throw {
        error: 'Error when retrieving data from NYT API'
    }
  };
}