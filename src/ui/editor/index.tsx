import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyboard } from '../../domains/keyboard/selectors';
import { setBase, setModifiers } from '../../domains/keyboard/actions';
import Component from './component';

interface PropTypes {
  base: string,
  modifiers: string,
  handleBaseChange: (e: React.FormEvent<HTMLInputElement>) => any,
  handleModifiersChange: (e: React.FormEvent<HTMLInputElement>) => any,
}

const mapStateToProps = (state) => {
  const keyboard = getKeyboard(state);
  return {
    base: keyboard.getBase(),
    modifiers: keyboard.getModifiers(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBaseChange: (e) => setBase({ base: e.target.value }),
  handleModifiersChange: (e) => setModifiers({ modifiers: e.target.value }),
}, dispatch);

const Editor: React.SFC<PropTypes> = ({
  base,
  modifiers,
  handleBaseChange,
  handleModifiersChange,
}) => (
  <Component
    base={base}
    modifiers={modifiers}
    handleBaseChange={handleBaseChange}
    handleModifiersChange={handleModifiersChange}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
