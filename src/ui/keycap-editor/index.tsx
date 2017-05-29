import * as React from 'react';
import { List, Set } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditor } from '../../domains/keycap-editor/selectors';
import {
  setActiveSection,
  setActiveBackgroundColor,
  setActiveLegendColor,
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
  handleBackgroundColorChange: (e: React.FormEvent<HTMLInputElement>) => any,
  handleLegendColorChange: (e: React.FormEvent<HTMLInputElement>) => any,
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

  handleBackgroundColorChange: (e) => setActiveBackgroundColor({
    backgroundColor: e.target.value,
  }),

  handleLegendColorChange: (e) => setActiveLegendColor({
    legendColor: e.target.value,
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
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
