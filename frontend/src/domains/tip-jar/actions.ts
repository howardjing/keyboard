import {
  ActionCreator,
  makeActionCreator,
} from '../../domains/actions';

const actionCreator = makeActionCreator('tip-jar');

const setSyncing = actionCreator<SetSyncing>('SET_SYNCING');
export interface SetSyncing {
  syncing: boolean,
};

const createTip = (token: stripe.Token, cents: number) => (dispatch) => {
  console.log("HEY", token, cents);
}

export {
  setSyncing,
  createTip,
};
