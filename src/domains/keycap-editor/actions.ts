import {
  ActionCreator,
  makeActionCreator,
} from '../../domains/actions';

import {
  Section
} from './reducer';

const actionCreator = makeActionCreator('keycap-editor');

const setActiveSection = actionCreator<SetActiveSection>('SET_ACTIVE_SECTION');
export interface SetActiveSection {
  section: Section,
};

const setActiveBackgroundColor =
  actionCreator<SetActiveBackgroundColor>('SET_ACTIVE_BACKGROUND_COLOR');
export interface SetActiveBackgroundColor {
  backgroundColor: string,
}

const setActiveLegendColor =
  actionCreator<SetActiveLegendColor>('SET_ACTIVE_LEGEND_COLOR');
export interface SetActiveLegendColor {
  legendColor: string,
}

export {
  setActiveSection,
  setActiveBackgroundColor,
  setActiveLegendColor,
};
