import { combineReducers } from 'redux';

import articlesReducer from './reducers/articlesReducers';
import filtersReducer from './reducers/filtersReducer';

const rootReducer = combineReducers({ articlesReducer, filtersReducer });
export default rootReducer;
