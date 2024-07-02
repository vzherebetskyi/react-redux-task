import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import rootState from "./rootState";

export default configureStore({reducer: rootReducer, preloadedState: rootState});
