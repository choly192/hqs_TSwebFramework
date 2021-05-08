export default {
  nameSpace: 'demoModel',
  state: {
    count: 0
  },
  effects: {
    *setCount(action: any | string, { put }: any | string): any {
      yield put({
        type: 'demoModel/getCount',
        payload: {
          count: 1
        }
      });
    }
  },
  reducers: {
    getCount(state: any | string, action: any | string): void {
      return { ...state, ...action.payload };
    }
  }
};
