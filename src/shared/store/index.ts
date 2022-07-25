import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './rootReducer';

type StoreParams = {
  initialState?: { [key: string]: any };
  middleware?: any[];
};

const configureStore = ({ initialState, middleware = [] }: StoreParams) => {
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

  const composeEnhancers = devtools || compose;

  return createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  );
};

export { configureStore, StoreParams };
