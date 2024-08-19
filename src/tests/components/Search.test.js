import React from 'react';
import { render as renderComponent, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import Search from '../../components/FilterBlock/Search/Search';

describe('Test Search component', () => {
  it('It should render Search component', () => {
    const { container } = renderComponent(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
    expect(container).toBeTruthy();
  });
  it('It should render input', () => {
    renderComponent(
      <Provider store={store}>
        <Search />
      </Provider>,
    );
    const searchInput = screen.getByPlaceholderText('Search articles');
    expect(searchInput).toBeInTheDocument();
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
});
