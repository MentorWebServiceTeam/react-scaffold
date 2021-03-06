import React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store';
import routes from './routes';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

match({ history, routes }, () => {
  render(
    (
      <Provider store={store}>
        <Router children={routes} history={browserHistory} />
      </Provider>
    ),
    document.getElementById('app')
  );
});
