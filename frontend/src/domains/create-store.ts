import { Map } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './root-reducer';
declare var process: any;

const predicate = (getState: any, action: { payload: any }): boolean => (
  !action.payload.preview
);

export default () => {
  const base = [thunk];
  const middleware = process.env.NODE_ENV === 'development' ?
    // only log in development
    base.concat([
      createLogger({
        predicate,
      }),
    ]) :
    base;

  return createStore(
    reducer,
    applyMiddleware(
      ...middleware
    ),
  );
}
