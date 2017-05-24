import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getKeyboard } from '../domains/keyboard/selectors';
import { setBase, setModifiers } from '../domains/keyboard/actions';

const mapStateToProps = (state) => {
  const keyboard = getKeyboard(state);
  return {
    base: keyboard.getBase(),
    modifiers: keyboard.getModifiers(),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  handleBaseChange: (e) => setBase({ base: e.target.value }),
  handlePlaceholderChange: (e) => setModifiers({ modifiers: e.target.value }),
}, dispatch);

const App = ({
  base,
  modifiers,
  handleBaseChange,
  handlePlaceholderChange,
}) => (
  <div>
    <h3>Keyboard</h3>
    <InputGroup>
      <label>
        <Label>Base</Label>
        <input
          type="text"
          value={base}
          placeholder="#eee"
          onChange={handleBaseChange}
        />
      </label>
    </InputGroup>
    <InputGroup>
      <label>
        <Label>Modifiers</Label>
        <input
          type="text"
          value={modifiers}
          placeholder="#eee"
          onChange={handlePlaceholderChange}
        />
      </label>
    </InputGroup>
  </div>
);

const InputGroup = styled.div`
  margin: 10px;
`;

const Label = styled.span`
  display: inline-block;
  width: 100px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(App);
