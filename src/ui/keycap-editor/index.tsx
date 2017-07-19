import * as React from 'react';
import { List, Set } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Color from 'color';
import { getEditor } from '../../domains/keycap-editor/selectors';
import {
  setActiveSection,
  setActiveBackgroundColor,
  setActiveLegendColor,
  setCaseColor,
} from '../../domains/keycap-editor/actions';
import Keyboard, { Keycap } from '../../domains/keycap-editor/keyboard';
import {
  Section,
  isSection,
} from '../../domains/keycap-editor/reducer';
import Component from './component';

interface PropTypes {
  keyboard: Keyboard,
  activeKeys: Set<Keycap>,
  section: Section,
  backgroundColor: Color.Color | null,
  legendColor: Color.Color | null,
  handleSectionChange: (section: Section) => any,
  handleBackgroundColorChange: (color: Color.Color, preview?: boolean) => any,
  handleLegendColorChange: (color: Color.Color, preview?: boolean) => any,
  handleCaseColorChange: (color: Color.Color, preview?: boolean) => any,
}

const mapStateToProps = (state) => {
  const editor = getEditor(state);
  return {
    keyboard: editor.getKeyboard(),
    activeKeys: editor.getActiveKeys(),
    section: editor.getActiveSection(),
    backgroundColor: editor.getActiveBackgroundColor(),
    legendColor: editor.getActiveLegendColor(),
  };
};

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
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
