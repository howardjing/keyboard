import { Map } from 'immutable';
import { Keyboard } from './reducer';

const getKeyboard = (state): Keyboard => (
  state.get('keyboard')
);

export {
  getKeyboard,
};
