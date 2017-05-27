import { Map } from 'immutable';
import { KeycapEditor } from './reducer';

const getEditor = (state): KeycapEditor => (
  state.get('keycapEditor')
);

export {
  getEditor,
};
