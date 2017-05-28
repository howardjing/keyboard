import * as React from 'react';
import styled from 'styled-components';
import Editor from './editor';
import Keyboard from '../../domains/keycap-editor/keyboard';
import {
  Section,
} from '../../domains/keycap-editor/reducer';

interface PropTypes {
  keyboard: Keyboard,
  section: Section,
  backgroundColor: string | null,
  legendColor: string | null,
  handleSectionChange: (e: React.FormEvent<HTMLSelectElement>) => any,
  handleBackgroundColorChange: (e: React.FormEvent<HTMLInputElement>) => any,
  handleLegendColorChange: (e: React.FormEvent<HTMLInputElement>) => any,
}

const KeycapEditor: React.SFC<PropTypes> = ({
  keyboard,
  section,
  backgroundColor,
  legendColor,
  handleSectionChange,
  handleBackgroundColorChange,
  handleLegendColorChange,
}) => (
  <div>
    <InputGroup>
      <label>
        <Label>Section</Label>
        <select
          onChange={handleSectionChange}
        >
          <option value="base">Base</option>
          <option value="modifiers">Modifiers</option>
        </select>
      </label>
    </InputGroup>
    <InputGroup>
      <label>
        <Label>Background color</Label>
        <input
          type="text"
          value={backgroundColor}
          onChange={handleBackgroundColorChange}
          placeholder="#fff"
        />
      </label>
    </InputGroup>
    <InputGroup>
      <label>
        <Label>Legend color</Label>
        <input
          type="text"
          value={legendColor}
          placeholder="#000"
          onChange={handleLegendColorChange}
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
  width: 140px;
`;

export default KeycapEditor;

