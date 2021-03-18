/**
 * 入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import RootRuter from '@/router/index';

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
const rootContainer = (
  // <Provider>
  <RootRuter />
  // </Provider>
);

ReactDOM.render(rootContainer, document.getElementById('root'));
