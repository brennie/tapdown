import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { Route } from 'react-router-dom';
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux';

import Splash from 'js/components/splash';

document.addEventListener('DOMContentLoaded', function onLoad() {
  const history = createHistory();
  const store = createStore(
    combineReducers({
      router: routerReducer,
    }),
    applyMiddleware(routerMiddleware(history)),
  );

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path="/" component={Splash} />
      </ConnectedRouter>
    </Provider>,
    document.querySelector('.content'),
  );
});
