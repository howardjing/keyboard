import { combineReducers } from 'redux-immutablejs';
import keycapEditor from './keycap-editor/reducer';
import tipJar from './tip-jar/reducer';

export default combineReducers({
  keycapEditor,
  tipJar,
});
