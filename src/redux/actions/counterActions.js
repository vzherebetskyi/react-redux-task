import {ADD_ONE, DEC_ONE, ADD_TEN, DEC_TEN, RESET_COUNT} from '../actionTypes/counterActionTypes';

export const addOne = () => ({
  type: ADD_ONE, 
  data: 1
});

export const decOne = () => ({
  type: DEC_ONE, 
  data: 1
});

export const addTen = () => ({
  type: ADD_TEN, 
  data: 10
});

export const decTen = () => ({
  type: DEC_TEN, 
  data: 10
});

export const resetCount = () => ({
  type: RESET_COUNT, 
  data: 0
});
