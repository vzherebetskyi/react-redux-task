import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

import ArticleCard from '../../components/ArticleCard/ArticleCard';

test('should render ArticleCard component correctly', () => {
  const elem = renderer
    .create(
      <ArticleCard
        article={{
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
        }}
      />,
    )
    .toJSON();
  expect(elem).toMatchSnapshot();
});

test('It should render fields of the cards correctly', () => {
  const { container } = render(
    <ArticleCard
      article={{
        author: 'John Doe',
        content: 'Medicine article',
        publishedAt: '2024-08-18T07:26:36Z',
        unifiedDate: '18th August 2024',
        source: 'No info',
        title: 'No info',
        url: null,
        urlToImage: null,
        category: 'mixed',
        api: 'test',
      }}
    />,
  );
  expect(container).toBeTruthy();
  const authorName = screen.getByText('John Doe');
  expect(authorName).toBeInTheDocument();
  const articleContent = screen.getByText('Medicine article');
  expect(articleContent).toBeInTheDocument();
  const articleDate = screen.getByText('18th August 2024');
  expect(articleDate).toBeInTheDocument();
  const articleSourceAndTitle = screen.getAllByText('No info');
  expect(articleSourceAndTitle).toHaveLength(2);
  const articleApi = screen.getByText('test');
  expect(articleApi).toBeInTheDocument();
});
