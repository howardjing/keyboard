import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import App from './ui';
import createStore from './domains/create-store';

const store = createStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
