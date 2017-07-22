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
  color: Color.Color,
  preview: boolean,
};

const setActiveLegendColor =
  actionCreator<SetActiveLegendColor>('SET_ACTIVE_LEGEND_COLOR');
export interface SetActiveLegendColor {
  color: Color.Color,
  preview: boolean,
};

const setCaseColor =
  actionCreator<SetCaseColor>('SET_CASE_COLOR');
export interface SetCaseColor {
  color: Color.Color,
  preview: boolean,
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

/**
 * given a color, select all keycaps where either background or
 * legend color matches
 */
const selectKeycapsWithColor =
  actionCreator<SelectKeycapsWithColor>('SELECT_KEYCAPS_WITH_COLOR');
export interface SelectKeycapsWithColor {
  color: Color.Color,
};

/**
 * given a color, change active keycaps such that if their background
 * color matches from color, change background color. If their legend color
 * matches from color, change legend color.
 */
const shiftColor =
  actionCreator<ShiftColor>('SHIFT_COLOR');
export interface ShiftColor {
  from: Color.Color,
  to: Color.Color,
  preview: boolean,
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
  selectKeycapsWithColor,
  shiftColor,
};
