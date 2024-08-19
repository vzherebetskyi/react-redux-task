import React from 'react';
import renderer from 'react-test-renderer';

import NotFound from '../../pages/NotFound/NotFound';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('should render NotFound component correctly', () => {
  const elem = renderer.create(<NotFound />).toJSON();
  expect(elem).toMatchSnapshot();
});
