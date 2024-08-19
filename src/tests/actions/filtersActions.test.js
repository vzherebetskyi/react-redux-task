import { updateSearch, updateFilters } from '../../redux/actions/filtersActions';
import { UPDATE_SEARCH, UPDATE_FILTERS } from '../../redux/actionTypes/filtersActionTypes';

test('should set up update search object', () => {
  const action = updateSearch('test');
  expect(action).toEqual({
    type: UPDATE_SEARCH,
    data: 'test',
  });
});

test('should set up update filters object', () => {
  const filtersData = {
    date: ['2024-08-15T07:26:36Z', '2024-08-16T07:26:36Z'],
    category: ['music', 'video'],
    source: ['source-1', 'source-2'],
  };
  const action = updateFilters(filtersData);
  expect(action).toEqual({
    type: UPDATE_FILTERS,
    data: filtersData,
  });
});
