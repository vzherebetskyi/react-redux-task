import { useSelector, useDispatch } from 'react-redux';
import { addOne, decOne, addTen, decTen, resetCount } from '../../redux/actions/counterActions';
import React from 'react';

function Counter() {
  const state = useSelector((state) => state.setCount);
  const dispatch = useDispatch();

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
