import React from 'react';
import renderer from 'react-test-renderer';

import FilterBlock from '../../components/FilterBlock/FilterBlock';

test('should render FilterBlock component correctly', () => {
  const elem = renderer.create(<FilterBlock />).toJSON();
  expect(elem).toMatchSnapshot();
});
