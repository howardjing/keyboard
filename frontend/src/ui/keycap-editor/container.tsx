import * as React from 'react';
import { List, Set } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Color from 'color';
import { KeycapEditor } from '../../domains/keycap-editor/reducer';
import {
  setActiveSection,
  setActiveBackgroundColor,
  setActiveLegendColor,
  setCaseColor,
  selectKeycapsWithColor as _selectKeycapsWithColor,
  shiftColor,
} from '../../domains/keycap-editor/actions';
import { extractColors } from '../../domains/keycap-editor/sharing';
import Keyboard, { Keycap } from '../../domains/keycap-editor/keyboard';
import {
  Section,
  isSection,
} from '../../domains/keycap-editor/reducer';
import Component from './component';

interface PropTypes {
  // from parent
  editor: KeycapEditor,

  // from mapStateToProps
  keyboard: Keyboard,
  activeKeys: Set<Keycap>,
  section: Section,
  backgroundColor: Color.Color | null,
  legendColor: Color.Color | null,

  // from mapDispatchToProps,
  handleSectionChange: (section: Section) => any,
  handleBackgroundColorChange: (color: Color.Color, preview?: boolean) => any,
  handleLegendColorChange: (color: Color.Color, preview?: boolean) => any,
  handleCaseColorChange: (color: Color.Color, preview?: boolean) => any,
  handleShiftColor: (from: Color.Color, to: Color.Color, preview?: boolean) => any,
  selectKeycapsWithColor: (color: Color.Color) => any,
}

const mapStateToProps = (state, { editor }) => ({
  keyboard: editor.getKeyboard(),
  activeKeys: editor.getActiveKeys(),
  section: editor.getActiveSection(),
  backgroundColor: editor.getActiveBackgroundColor(),
  legendColor: editor.getActiveLegendColor(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleSectionChange: (section: Section) => {
    return setActiveSection({ section });
  },

  handleCaseColorChange: (color: Color.Color, preview: boolean = false) => {
    return setCaseColor({ color, preview });
  },

  handleBackgroundColorChange: (color: Color.Color, preview: boolean = false) =>
    setActiveBackgroundColor({ color, preview }),

  handleLegendColorChange: (color: Color.Color, preview: boolean = false) =>
    setActiveLegendColor({ color, preview }),

  handleShiftColor: (from: Color.Color, to: Color.Color, preview: boolean = false) =>
    shiftColor({ from, to, preview }),

  selectKeycapsWithColor: (color: Color.Color) =>
    _selectKeycapsWithColor({ color }),
}, dispatch);

const Editor: React.SFC<PropTypes> = ({
  keyboard,
  activeKeys,
  section,
  backgroundColor,
  legendColor,
  handleSectionChange,
  handleBackgroundColorChange,
  handleLegendColorChange,
  handleCaseColorChange,
  handleShiftColor,
  selectKeycapsWithColor,
}) => (
  <Component
    keyboard={keyboard}
    activeKeys={activeKeys}
    section={section}
    backgroundColor={backgroundColor}
    legendColor={legendColor}
    handleSectionChange={handleSectionChange}
    handleBackgroundColorChange={handleBackgroundColorChange}
    handleLegendColorChange={handleLegendColorChange}
    handleCaseColorChange={handleCaseColorChange}
    handleShiftColor={handleShiftColor}
    selectKeycapsWithColor={selectKeycapsWithColor}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
