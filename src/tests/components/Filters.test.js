import React from 'react';
import { render as renderComponent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import Filters from '../../components/FilterBlock/Filters/Filters';

describe('Test Filters component', () => {
  it('It should render Filters component', () => {
    const { container } = renderComponent(
      <Provider store={store}>
        <Filters />
      </Provider>,
    );
    expect(container).toBeTruthy();
  });
  it('It should render Skeleton component', () => {
    const { container } = renderComponent(
      <Provider store={store}>
        <Filters />
      </Provider>,
    );
    expect(container).toBeTruthy();
    const skeletonComponent = container.getElementsByClassName('react-loading-skeleton');
    expect(skeletonComponent.length).toBe(1);
  });
});
