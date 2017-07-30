import { Record } from 'immutable';
import { createReducer } from 'redux-immutablejs';
import {
  setSyncing, SetSyncing,
} from './actions';
import { Action } from '../../domains/actions';

class TipJar extends Record({
  syncing: false,
}) {

}

const handleSetSyncing = (state: TipJar, action: Action<SetSyncing>) => {
  const { syncing } = action.payload;
  return state.set('syncing', syncing);
};

const initialState = new TipJar();

export default createReducer(initialState, {
  [setSyncing.type]: handleSetSyncing,
});
