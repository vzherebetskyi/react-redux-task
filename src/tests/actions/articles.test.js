import { addArticles, purgeArticles, filterArticles } from '../../redux/actions/articlesActions';
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
];

test('should set up add articles object', () => {
  const action = addArticles(articles);
  expect(action).toEqual({
    type: ADD_ARTICLES,
    data: articles,
  });
});

test('should set up purge articles object', () => {
  const action = purgeArticles();
  expect(action).toEqual({
    type: PURGE_ARTICLES,
  });
});

test('should set up filter articles object', () => {
  const action = filterArticles(articles);
  expect(action).toEqual({
    type: FILTER_ARTICLES,
    data: articles,
  });
});
