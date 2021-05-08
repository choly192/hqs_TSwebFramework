'use strict';
/**
 * 注册数据流
 */
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as sagaEffects from 'redux-saga/effects';
import { initStore } from './store';
export const registerStore = (): any => {
  const [
    NAMESPACE_SEP, // 类型分隔符
    ROOT_NAMESPACE, // 根级命名空间
    _effects // 副作用
  ] = ['/', 'global', []];

  // Create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  const app = {
    store: null,
    _models: [],
    useModel: (model: any): any => {
      app._models.push(
        ...model
          .filter(m => m)
          .map(current => {
            current.nameSpace = current.nameSpace || ROOT_NAMESPACE;
            return current;
          })
      );
      return app;
    },
    run
  };
  return app;

  /**
   * run
   */
  function run(): any {
    const createReducer = createReducers(); // create reducers list
    const store = create(createReducer); // create Store
    app.store = store;
    sagaMiddleware.run(createEffects()); // run saga
    initStore(store); // create store using for js
    return store;
  }
  /**
   * create Store
   */
  function create(appReducer): any {
    return createStore(combineReducers(appReducer), composeWithDevTools(applyMiddleware(sagaMiddleware)));
  }

  /**
   * create reducers list
   */
  function createReducers(): any {
    return app._models.reduce((acc, model) => {
      if (model.reducers) {
        acc[model.nameSpace] = createReducerFunc(model);
      }
      return acc;
    }, {});
  }
  /**
   * create reducer package function
   */
  function createReducerFunc(model): any {
    const { nameSpace, reducers } = model;
    if (reducers) {
      const initState = model.state;
      const reducerFunMap = Object.keys(reducers).reduce((acc, reducerKey) => {
        acc[`${nameSpace}${NAMESPACE_SEP}${reducerKey}`] = reducers[reducerKey];
        return acc;
      }, {});
      return (state = initState, action): any => {
        const type = action.type;
        if (reducerFunMap[type]) {
          return reducerFunMap[action.type](state, action);
        }
        return state;
      };
    }
  }
  /**
   * create effect
   */
  function createEffects(): any {
    app._models.map((model: any) => {
      const { nameSpace, effects } = model;
      if (effects) {
        return _effects.push(
          ...Object.keys(effects).map(effectKey => {
            return function* (): any {
              try {
                while (true) {
                  const action = yield sagaEffects.take(`${nameSpace}${NAMESPACE_SEP}${effectKey}`);
                  yield* effects[effectKey](action, sagaEffects);
                }
              } catch (e) {
                console.log(e);
              }
            };
          })
        );
      }
      return console.warn('无redux副作用函数');
    });
    return function* rootSaga(): any {
      yield sagaEffects.all(_effects.map(sagaEffects.fork));
    };
  }
};
