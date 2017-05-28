import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import reducer from './root-reducer';
import { createLogger } from 'redux-logger';

declare var process: any;

export default (middleware = [], initialState = Map()) => {
  const finalizedMiddleware = process.env.NODE_ENV === 'development' ?
    // only log in development
    middleware.concat([
      createLogger(),
    ]) :
    middleware;

  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      ...finalizedMiddleware
    ),
  );
}
