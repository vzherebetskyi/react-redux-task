import filtersReducer from '../../redux/reducers/filtersReducer';
import { UPDATE_SEARCH, UPDATE_FILTERS } from '../../redux/actionTypes/filtersActionTypes';

test('should update search value', () => {
  const action = {
    type: UPDATE_SEARCH,
    data: 'test',
  };
  const state = filtersReducer({ searchValue: '', filters: {} }, action);
  expect(state).toEqual({ searchValue: 'test', filters: {} });
});

test('should update filters', () => {
  const filtersData = {
    date: ['2024-08-15T07:26:36Z', '2024-08-16T07:26:36Z'],
    category: ['music', 'video'],
    source: ['source-1', 'source-2'],
  };
  const action = {
    type: UPDATE_FILTERS,
    data: filtersData,
  };
  const state = filtersReducer({ searchValue: '', filters: {} }, action);
  expect(state).toEqual({ searchValue: '', filters: filtersData });
});
