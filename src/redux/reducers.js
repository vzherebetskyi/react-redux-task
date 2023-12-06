import { combineReducers } from "redux";

import setCount from "./reducers/counterReducers"

const rootReducer = combineReducers({setCount}); 
export default rootReducer;
