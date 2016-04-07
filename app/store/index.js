import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import * as reducers from '../reducers';

export default function configureStore(initialState = {}, history) {
  const middleware = [promise, thunk];
  const reduxRouterMiddleware = routerMiddleware(history);
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });
  const devTools = typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() :
      f => f;
  const store = compose(
    applyMiddleware(...middleware, reduxRouterMiddleware),
    devTools
  )(createStore)(reducer, initialState);
  return store;
}
