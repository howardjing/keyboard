import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditor } from '../../domains/keycap-editor/selectors';
import { setBase, setModifiers } from '../../domains/keycap-editor/actions';
import Keyboard from '../../domains/keycap-editor/keyboard';
import Component from './component';

interface PropTypes {
  base: string,
  modifiers: string,
  keyboard: Keyboard,
  handleBaseChange: (e: React.FormEvent<HTMLInputElement>) => any,
  handleModifiersChange: (e: React.FormEvent<HTMLInputElement>) => any,
}

const mapStateToProps = (state) => {
  const editor = getEditor(state);
  return {
    keyboard: editor.getKeyboard(),
    base: editor.getBase(),
    modifiers: editor.getModifiers(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBaseChange: (e) => setBase({ base: e.target.value }),
  handleModifiersChange: (e) => setModifiers({ modifiers: e.target.value }),
}, dispatch);

const Editor: React.SFC<PropTypes> = ({
  keyboard,
  base,
  modifiers,
  handleBaseChange,
  handleModifiersChange,
}) => (
  <Component
    keyboard={keyboard}
    base={base}
    modifiers={modifiers}
    handleBaseChange={handleBaseChange}
    handleModifiersChange={handleModifiersChange}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
