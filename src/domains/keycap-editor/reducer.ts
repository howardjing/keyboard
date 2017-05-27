import { Record } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import { Action } from '../../domains/actions';
import {
  setBase, SetBase,
  setModifiers, SetModifiers,
} from './actions';
import Keyboard from './keyboard';

class KeycapEditor extends Record({
  base: '',
  modifiers: '',
  keyboard: Keyboard.build(),
}) {
  getBase(): string {
    return this.get('base');
  }

  getModifiers(): string {
    return this.get('modifiers');
  }

  getKeyboard(): Keyboard {
    return this.get('keyboard');
  }
}

const initialState = new KeycapEditor();

const handleSetBase = (state: KeycapEditor, action: Action<SetBase>) => (
  state.set('base', action.payload.base)
);

const handleSetModifiers = (state: KeycapEditor, action: Action<SetModifiers>) => (
  state.set('modifiers', action.payload.modifiers)
);

export default createReducer(initialState, {
  [setBase.type]: handleSetBase,
  [setModifiers.type]: handleSetModifiers,
});

export {
  KeycapEditor,
};
