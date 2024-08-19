import articlesReducer from '../../redux/reducers/articlesReducers';
import { ADD_ARTICLES, PURGE_ARTICLES, FILTER_ARTICLES } from '../../redux/actionTypes/articlesActionTypes';

const articles = [
  {
    author: 'No info',
    content: 'No info',
    publishedAt: '2024-08-18T07:26:36Z',
    unifiedDate: '18th August 2024',
    source: 'No info',
    title: 'No info',
    url: null,
    urlToImage: null,
    category: 'mixed',
    api: 'test',
  },
  {
    author: 'John Doe',
    content: 'Some content',
    publishedAt: '2024-08-16T07:26:36Z',
    unifiedDate: '16th August 2024',
    source: 'No info',
    title: 'No info',
    url: null,
    urlToImage: null,
    category: 'fiction',
    api: 'test',
  },
];

test('should add articles', () => {
  const action = {
    type: ADD_ARTICLES,
    data: articles,
  };
  const state = articlesReducer({ articles: [], filteredArticles: [] }, action);
  expect(state).toEqual({ articles: articles, filteredArticles: articles });
});

test('should purge articles', () => {
  const action = {
    type: PURGE_ARTICLES,
  };
  const state = articlesReducer({ articles: articles, filteredArticles: articles }, action);
  expect(state).toEqual({ articles: [], filteredArticles: [] });
});

test('should filter articles', () => {
  const filtArticles = [
    {
      author: 'John Doe',
      content: 'Some content',
      publishedAt: '2024-08-16T07:26:36Z',
      unifiedDate: '16th August 2024',
      source: 'No info',
      title: 'No info',
      url: null,
      urlToImage: null,
      category: 'fiction',
      api: 'test',
    },
  ];
  const action = {
    type: FILTER_ARTICLES,
    data: filtArticles,
  };
  const state = articlesReducer({ articles: articles, filteredArticles: articles }, action);
  expect(state).toEqual({ articles: articles, filteredArticles: filtArticles });
});
