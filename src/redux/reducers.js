import { combineReducers } from "redux";

import setCount from "./reducers/counterReducers"
import articlesReducer from "./reducers/articlesReducers";

const rootReducer = combineReducers({setCount, articlesReducer}); 
export default rootReducer;
