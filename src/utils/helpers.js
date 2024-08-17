import { APITypes } from './constants';
import moment from 'moment';

// article object structure
// const articleObject = {
//     author: string,
//     content: string,
//     publishedAt: Date,
//     unifiedDate: string,
//     source: string,
//     title: string,
//     url: string | null,
//     urlToImage: string | null,
//     category: string,
//     api: string
// }

export const convertArticlesDataToUnifiedFormat = (articles, APIType) => {
  const filtersData = {
    date: [],
    category: [],
    source: [],
  };

  if (APIType === APITypes[0]) {
    filtersData.category = ['mixed'];
    const unifiedArticles = articles.map((article) => {
      const unifiedDate = moment(article.publishedAt).format('Do MMMM YYYY');
      filtersData.date = [...filtersData.date, unifiedDate];
      filtersData.source = [...filtersData.source, article?.source?.name];
      return {
        author: article?.author || 'No info',
        content: article?.content || 'No info',
        publishedAt: article?.publishedAt || 'No info',
        unifiedDate: unifiedDate,
        source: article?.source?.name || 'No info',
        title: article?.title || 'No info',
        url: article?.url || null,
        urlToImage: article?.urlToImage || null,
        category: 'mixed',
        api: APIType,
      };
    });

    return [unifiedArticles, filtersData];
  }
  if (APIType === APITypes[1]) {
    filtersData.source = ['The Guardian'];
    const unifiedArticles = articles.map((article) => {
      const unifiedDate = moment(article?.webPublicationDate).format('Do MMMM YYYY');
      filtersData.date = [...filtersData.date, unifiedDate];
      filtersData.category = [...filtersData.category, article?.sectionName];
      return {
        author: article?.fields?.byline || 'No info',
        content: 'No info',
        publishedAt: article?.webPublicationDate || 'No info',
        unifiedDate: unifiedDate,
        source: 'The Guardian',
        title: article?.webTitle || 'No info',
        url: article?.webUrl || null,
        urlToImage: null,
        category: article?.sectionName || 'mixed',
        api: APIType,
      };
    });

    return [unifiedArticles, filtersData];
  }
  if (APIType === APITypes[2]) {
    const unifiedArticles = articles.map((article) => {
      const unifiedDate = moment(article?.pub_date).format('Do MMMM YYYY');
      filtersData.date = [...filtersData.date, unifiedDate];
      filtersData.category = [...filtersData.category, article?.section_name];
      filtersData.source = [...filtersData.source, article?.source];
      return {
        author: article?.byline?.original || 'No info',
        content: article?.abstract || 'No info',
        publishedAt: article?.pub_date || 'No info',
        unifiedDate: unifiedDate,
        source: article?.source || 'The New York Times',
        title: article?.headline?.main || 'No info',
        url: article?.web_url || null,
        urlToImage:
          article.multimedia && article.multimedia.length > 0
            ? `https://static01.nyt.com/${article.multimedia[0].url}`
            : null,
        category: article?.section_name || 'mixed',
        api: APIType,
      };
    });

    return [unifiedArticles, filtersData];
  }
};

export const getFilteredArticles = (articles, appliedDates, appliedCategories, appliedSources) => {
  const datesFilterOptions = appliedDates.map((date) => date.value);
  const categoriesFilterOptions = appliedCategories.map((cat) => cat.value);
  const sourcesFilterOptions = appliedSources.map((sour) => sour.value);

  const filteredArticles = articles.filter(
    (article) =>
      datesFilterOptions.includes(article.unifiedDate) &&
      categoriesFilterOptions.includes(article.category) &&
      sourcesFilterOptions.includes(article.source),
  );

  return filteredArticles;
};

export const getLocallyStoredData = (dataName) => {
  try {
    const unparsedData = localStorage.getItem(dataName);
    if (unparsedData) {
      const parsedData = JSON.parse(unparsedData);
      return parsedData;
    }
    return undefined;
  } catch (e) {
    console.error(e);
  }
};

export const setLocallyStoredData = (dataName, data) => {
  try {
    localStorage.setItem(dataName, JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
};
