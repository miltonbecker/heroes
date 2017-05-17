import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import heroesApp from './redux/reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(heroesApp, applyMiddleware(thunkMiddleware));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
