import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import reducer from './root-reducer';
import { createLogger } from 'redux-logger';

export default (middleware = [], initialState = Map()) => {
  // TODO: don't use logger in prod
  const finalizedMiddleware = middleware.concat([
    createLogger(),
  ]);

  return createStore(
    reducer,
    initialState,
    applyMiddleware(
      ...finalizedMiddleware
    ),
  );
}
