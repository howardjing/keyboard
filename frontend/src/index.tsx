import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import App from './ui';
import createStore from './domains/create-store';
import Stripe from './api/stripe';
import './favicon.ico';

const store = createStore();

// render react
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);

// load stripe:
Stripe.load();
