'use strict';
/**
 * 创建可以用于js中的store
 */
let store = '';
// 初始化store存储
const initStore = (inStore: any | string): void => {
  store = inStore;
};
export { initStore, store };
