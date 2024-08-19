import React from 'react';
import { render as renderComponent, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../redux/store';
import Preferences from '../../components/FilterBlock/Preferences/Preferences';

describe('Test Filters component', () => {
  it('It should render Preferences component', () => {
    const { container } = renderComponent(
      <Provider store={store}>
        <Preferences />
      </Provider>,
    );
    expect(container).toBeTruthy();
  });
  it('It should render 3 inputs for preferences', () => {
    const { container } = renderComponent(
      <Provider store={store}>
        <Preferences />
      </Provider>,
    );
    expect(container).toBeTruthy();
    const sourcesInput = screen.getByPlaceholderText('Enter preferred sources');
    const categoriesInput = screen.getByPlaceholderText('Enter preferred categories');
    const authorsInput = screen.getByPlaceholderText('Enter preferred authors');
    expect(sourcesInput).toBeInTheDocument();
    expect(categoriesInput).toBeInTheDocument();
    expect(authorsInput).toBeInTheDocument();
  });
  it('It should update the component', () => {
    renderComponent(
      <Provider store={store}>
        <Preferences />
      </Provider>,
    );
    const sourcesInput = screen.getByPlaceholderText('Enter preferred sources');
    expect(sourcesInput).toBeInTheDocument();
    fireEvent.change(sourcesInput, { target: { value: 'test' } });
    expect(sourcesInput.value).toBe('test');
  });
});
