/**
 * 入口
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RootRuter from '@/router/index';
import { registerStore } from './common/store/registerStore';

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
// 创建store
//@ts-ignore
const context = require.context('@/model', true, /\.ts$/);
const _registerStore = registerStore();
const store = _registerStore.useModel(context.keys().map(key => context(key).default)).run();
const rootContainer = (
  <Provider store={store}>
    <RootRuter />
  </Provider>
);

ReactDOM.render(rootContainer, document.getElementById('root'));
