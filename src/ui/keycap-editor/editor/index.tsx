import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Keyboard from '../../../domains/keycap-editor/keyboard';
import Keycap, { KEYCAP_BASE } from './keycap';

const Editor: React.SFC<{
  keyboard: Keyboard,
}> = ({
  keyboard,
}) => (
  <Frame>
    {keyboard.getAlphanumeric().map((group, i)=> (
      <Row
        key={i}
      >
        {group.map((keycap) => (
          <Keycap
            key={keycap.getId()}
            keycap={keycap}
          />
        ))}
      </Row>
    ))}
  </Frame>
);

const MARGIN_WIDTH = 2;

const Frame = styled.div`
  background-color: #2d2d2d;
  padding: 12px;
  border-top: 2px solid #3c3c3c;
  border-right: 6px solid #585858;
  border-bottom: 8px solid #3c3c3c;
  border-left: 2px solid #585858;
  border-radius: 2px;
  width: ${() => KEYCAP_BASE * 15 + 13 * MARGIN_WIDTH}px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Editor;
