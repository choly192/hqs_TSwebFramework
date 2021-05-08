import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Home = props => {
  let { count } = useSelector(state => state.demoModel);
  const dispatch = useDispatch();
  const handleTest = () => {
    dispatch({
      type: 'demoModel/getCount',
      payload: {
        count: ++count
      }
    });
  };
  return (
    <div>
      <span onClick={() => handleTest()}>点击+1</span>
      <p>{count}</p>
    </div>
  );
};
export default Home;
