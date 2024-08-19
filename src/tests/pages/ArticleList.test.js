import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import ArticlesList from '../../pages/ArticlesList/ArticlesList';

test('should render ArticlesList component correctly', () => {
  const elem = renderer
    .create(
      <Provider store={store}>
        <ArticlesList />
      </Provider>,
    )
    .toJSON();
  expect(elem).toMatchSnapshot();
});
