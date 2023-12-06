import { useReducer } from 'react';

import { addOne, decOne, addTen, decTen, resetCount } from '../../redux/actions/counterActions';
import setCount from "../../redux/reducers/counterReducers"


function Counter() {
	const [state, dispatch] = useReducer(setCount, { ele: 0 });

  return (
    <div>
      <p>Count is: {state.ele}</p>
      <div>
        <button onClick={() => dispatch(addOne())}>Add 1</button>
        <button onClick={() => dispatch(decOne())}>Decrease 1</button>

        <button onClick={() => dispatch(addTen())}>Add 10</button>
        <button onClick={() => dispatch(decTen())}>Decrease 10</button>

        <button onClick={() => dispatch(resetCount())}>Reset count</button>
      </div>
    </div>
  );
}

export default Counter;
