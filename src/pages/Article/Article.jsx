import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../components/layouts/base';
import { addOne, decOne, addTen, decTen, resetCount } from '../../redux/actions/counterActions';

const Article = () => {
  const state = useSelector((state) => state.setCount);
  const dispatch = useDispatch();

  return (
    <Layout>
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
    </Layout>
  );
}

export default Article;
