import {
  ActionCreator,
  makeActionCreator,
} from '../../domains/actions';

const actionCreator = makeActionCreator('keyboard');

const setBase = actionCreator<SetBase>('SET_BASE');
export interface SetBase {
  base: string;
}

const setModifiers = actionCreator<SetModifiers>('SET_MODIFERS');
export interface SetModifiers {
  modifiers: string;
}

export {
  setBase,
  setModifiers,
};
