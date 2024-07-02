import {ADD_ONE, DEC_ONE, ADD_TEN, DEC_TEN, RESET_COUNT} from '../actionTypes/counterActionTypes';

const initialState = { ele: 0 };

const setCount = ( state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE: {
      return {...state, ele: state.ele + action.data}
    }
    case DEC_ONE: {
      return {...state, ele: state.ele - action.data}
    }
    case ADD_TEN: {
      return {...state, ele: state.ele + action.data}
    }
    case DEC_TEN: {
      return {...state, ele: state.ele - action.data}
    }
    case RESET_COUNT: {
      return {...state, ele: 0}
    }
    default: 
      return state
  }
}

export default setCount;
export {initialState};
