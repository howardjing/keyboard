import { Record } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import { Action } from '../../domains/actions';
import {
  setBase, SetBase,
  setModifiers, SetModifiers,
} from './actions';

class Keyboard extends Record({
  base: '',
  modifiers: '',
}) {
  getBase(): string {
    return this.get('base');
  }

  getModifiers(): string {
    return this.get('modifiers');
  }
}

const initialState = new Keyboard();

const handleSetBase = (state: Keyboard, action: Action<SetBase>) => (
  state.set('base', action.payload.base)
);

const handleSetModifiers = (state: Keyboard, action: Action<SetModifiers>) => (
  state.set('modifiers', action.payload.modifiers)
);

export default createReducer(initialState, {
  [setBase.type]: handleSetBase,
  [setModifiers.type]: handleSetModifiers,
});

export {
  Keyboard,
};
