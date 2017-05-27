import * as React from 'react';
import styled from 'styled-components';
import Editor from './editor';
import Keyboard from '../../domains/keycap-editor/keyboard';

interface PropTypes {
  keyboard: Keyboard
  base: string,
  modifiers: string,
  handleBaseChange: (e: React.FormEvent<HTMLInputElement>) => any,
  handleModifiersChange: (e: React.FormEvent<HTMLInputElement>) => any,
}

const KeycapEditor: React.SFC<PropTypes> = ({
  keyboard,
  base,
  modifiers,
  handleBaseChange,
  handleModifiersChange,
}) => (
  <div>
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
          onChange={handleModifiersChange}
        />
      </label>
    </InputGroup>
    <Editor
      keyboard={keyboard}
    />
  </div>
);

const InputGroup = styled.div`
  margin: 10px;
`;

const Label = styled.span`
  display: inline-block;
  width: 100px;
`;

export default KeycapEditor;

