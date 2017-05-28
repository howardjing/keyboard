import * as React from 'react';
import { List } from 'immutable';
import styled from 'styled-components';
import { darken } from 'polished';
import Keyboard, { Keycap as Cap } from '../../../domains/keycap-editor/keyboard';
import Keycap, { KEYCAP_BASE } from './keycap';

const Editor: React.SFC<{
  keyboard: Keyboard,
}> = ({
  keyboard,
}) => {
  const contextual = keyboard.getContextual();
  const escape = contextual.get(0);
  const f1 = contextual.get(1);
  const f5 = contextual.get(2);
  const f9 = contextual.get(3);
  const print = contextual.get(4);
  return (
    <Frame>
      <Alphanumeric>
        {keyboard.getAlphanumeric().map((group, i) => (
          <Row
            key={`alpha-${i}`}
          >
            {group.map((keycap) => (
              <Keycap
                key={keycap.getId()}
                keycap={keycap}
              />
            ))}
          </Row>
        ))}
      </Alphanumeric>
    </Frame>
  );
};

const Keycaps: React.SFC<{
  keycaps: List<Cap>,
}> = ({
  keycaps,
}) => (
  <Row>
    {keycaps.map(keycap => (
      <Keycap
        key={keycap.getId()}
        keycap={keycap}
      />
    ))}
  </Row>
);

const MARGIN_WIDTH = 2;
const FRAME_BEZEL = 12;

const Frame = styled.div`
  width: ${() => KEYCAP_BASE * 15 + MARGIN_WIDTH * 13}px;
  background-color: #2d2d2d;
  padding: ${() => FRAME_BEZEL}px;
  border-top: 2px solid #3c3c3c;
  border-right: 6px solid #585858;
  border-bottom: 8px solid #3c3c3c;
  border-left: 2px solid #585858;
  border-radius: 2px;
`;

const Contextual = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${() => FRAME_BEZEL * 2}px;
`;

const ContextualRow = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Alphanumeric = styled.div`
  width: ${() => KEYCAP_BASE * 15 + MARGIN_WIDTH * 13}px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Editor;
