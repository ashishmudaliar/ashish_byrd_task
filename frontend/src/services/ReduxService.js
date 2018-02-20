import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';

class ReduxService {
  constructor() {
    const reducer = combineReducers(reducers);
    this.store = createStore(reducer);
  }

  dispatch = (action) => {
    this.store.dispatch(action);
  }
}

const reduxStore = new ReduxService();

export const dispatch = reduxStore.dispatch;
export default reduxStore;
