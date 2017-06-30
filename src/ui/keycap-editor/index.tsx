import * as React from 'react';
import { List, Set } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
  backgroundColor: string | null,
  legendColor: string | null,
  handleSectionChange: (e: React.FormEvent<HTMLSelectElement>) => any,
  handleBackgroundColorChange: (color: string) => any,
  handleLegendColorChange: (color: string) => any,
  handleCaseColorChange: (color: string) => any,
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
  handleSectionChange: (e) => {
    const val = e.target.value;
    if (isSection(val)) {
      return setActiveSection({ section: val });
    } else {
      return ({
        type: 'identity',
      });
    }
  },

  handleCaseColorChange: (color: string) => {
    return setCaseColor({ color });
  },

  handleBackgroundColorChange: (color: string) => setActiveBackgroundColor({
    color,
  }),

  handleLegendColorChange: (color: string) => setActiveLegendColor({
    color,
  }),
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
