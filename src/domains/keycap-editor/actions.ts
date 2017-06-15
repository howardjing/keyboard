import {
  ActionCreator,
  makeActionCreator,
} from '../../domains/actions';

import {
  Section
} from './reducer';

import {
  Keycap
} from './keyboard';

const actionCreator = makeActionCreator('keycap-editor');

const setActiveSection = actionCreator<SetActiveSection>('SET_ACTIVE_SECTION');
export interface SetActiveSection {
  section: Section,
};

const setActiveBackgroundColor =
  actionCreator<SetActiveBackgroundColor>('SET_ACTIVE_BACKGROUND_COLOR');
export interface SetActiveBackgroundColor {
  color: string,
};

const setActiveLegendColor =
  actionCreator<SetActiveLegendColor>('SET_ACTIVE_LEGEND_COLOR');
export interface SetActiveLegendColor {
  color: string,
};

const setCaseColor =
  actionCreator<SetCaseColor>('SET_CASE_COLOR');
export interface SetCaseColor {
  color: string,
};

const setActiveKeycap =
  actionCreator<SetActiveKeycap>('SET_ACTIVE_KEYCAP');
export interface SetActiveKeycap {
  keycap: Keycap,
};

const addActiveKeycap =
  actionCreator<AddActiveKeycap>('ADD_ACTIVE_KEYCAP');
export interface AddActiveKeycap {
  keycap: Keycap,
};

const setMouseDown =
  actionCreator<SetMouseDown>('SET_MOUSE_DOWN');
export interface SetMouseDown {
  mouseDown: boolean,
};

export {
  setActiveSection,
  setActiveBackgroundColor,
  setActiveLegendColor,
  setCaseColor,
  setActiveKeycap,
  addActiveKeycap,
  setMouseDown,
};
