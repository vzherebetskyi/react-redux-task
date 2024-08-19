import React from 'react';
import renderer from 'react-test-renderer';

import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';

test('should render SkeletonCard component correctly', () => {
  const elem = renderer.create(<SkeletonCard />).toJSON();
  expect(elem).toMatchSnapshot();
});
