import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { routeReducer } from 'react-router-redux';

import * as reducers from '../reducers';

export default function configureStore(history) {
  const middleware = [
    promise,
    thunk
  ];

  return createStore(
    combineReducers({
      ...reducers
    }),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f,
    applyMiddleware(...middleware)
  );
}
