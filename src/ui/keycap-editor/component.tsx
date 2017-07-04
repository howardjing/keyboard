import * as React from 'react';
import { List, Set } from 'immutable';
import styled from 'styled-components';
import Editor from './editor';
import Keyboard, { Keycap } from '../../domains/keycap-editor/keyboard';
import {
  Section,
} from '../../domains/keycap-editor/reducer';
import KeyboardComponent from './keyboard';
import Swatches from './swatches';
import Input from './_common/input';

interface PropTypes {
  keyboard: Keyboard,
  activeKeys: Set<Keycap>
  section: Section,
  backgroundColor: string | null,
  legendColor: string | null,
  handleSectionChange: (e: React.FormEvent<HTMLSelectElement>) => any,
  handleBackgroundColorChange: (color: string) => any,
  handleCaseColorChange: (color: string) => any,
  handleLegendColorChange: (color: string) => any,
}

const KeycapEditor: React.SFC<PropTypes> = ({
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
  <div>
    <EditorWrapper>
      <div>
        <Editor
          keyboard={keyboard}
          activeKeys={activeKeys}
        />
      </div>
      <Form>
        <InputGroup>
          <label>
            <Label>Section</Label>
            <select
              value={section}
              onChange={handleSectionChange}
            >
              <option value="base">Base</option>
              <option value="modifiers">Modifiers</option>
              <option
                value="custom"
                disabled
              >
                Custom
              </option>
            </select>
          </label>
        </InputGroup>
        <InputGroup>
          <label>
            <Label>Background color</Label>
            <Input
              type="text"
              value={backgroundColor || ''}
              onChange={handleBackgroundColorChange}
              placeholder="#fff"
            />
            <Swatches onClick={handleBackgroundColorChange} />
          </label>
        </InputGroup>
        <InputGroup>
          <label>
            <Label>Legend color</Label>
            <Input
              type="text"
              value={legendColor || ''}
              placeholder="#000"
              onChange={handleLegendColorChange}
            />
            <Swatches onClick={handleLegendColorChange} />
          </label>
        </InputGroup>
        <InputGroup>
          <label>
            <Label>Case color</Label>
            <Input
              type="text"
              value={keyboard.getCaseColor()}
              placeholder="#1a1a1a"
              onChange={handleCaseColorChange}
            />
          </label>
        </InputGroup>
      </Form>
    </EditorWrapper>
    <h3>Preview</h3>
    <KeyboardComponent
      keyboard={keyboard}
    />
  </div>
);

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Form = styled.div`
  max-width: 600px;
`;

const InputGroup = styled.div`
  margin: 10px;
`;

const Label = styled.span`
  display: inline-block;
  width: 140px;
`;

export default KeycapEditor;

