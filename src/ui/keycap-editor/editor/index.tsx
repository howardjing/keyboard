import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Keyboard from '../../../domains/keycap-editor/keyboard';

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
            width={keycap.getWidth()}
            key={keycap.getId()}
          >
            <InnerKeycap>
            <div>{keycap.getSecondaryLabel()}</div>
            <div>{keycap.getPrimaryLabel()}</div>
            </InnerKeycap>
          </Keycap>
        ))}
      </Row>
    ))}
  </Frame>
);

const KEYCAP_BASE = 50;
const MARGIN_WIDTH = 2;
const MARGIN_HEIGHT = 1;

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
const _Keycap: React.SFC<{
  className?: string,
  width: number,
}> = ({
  className,
  width,
  children,
}) => (
  <div className={className}>
    {children}
  </div>
)

const Keycap = styled(_Keycap)`
  display: flex;
  background-color: ${() => darken(0.1, '#fff')};
  box-sizing: border-box;
  flex: 0 0 auto;
  border-radius: 5px;
  width: ${props => props.width * KEYCAP_BASE}px;
  height: ${() => KEYCAP_BASE}px;
  margin: ${() => MARGIN_HEIGHT}px 0;
`;

const InnerKeycap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 98%;
  height: 90%;
  padding: 2px;
  flex: 0 0 auto;
  background-color: #fff;
  border-radius: 3px;
  font-size: 12px;
`

export default Editor;
