import * as React from 'react';
import styled from 'styled-components';

interface PropTypes {
  base: string,
  modifiers: string,
  handleBaseChange: (e: React.FormEvent<HTMLInputElement>) => any,
  handleModifiersChange: (e: React.FormEvent<HTMLInputElement>) => any,
}

const Editor: React.SFC<PropTypes> = ({
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
  </div>
);

const InputGroup = styled.div`
  margin: 10px;
`;

const Label = styled.span`
  display: inline-block;
  width: 100px;
`;

export default Editor;

