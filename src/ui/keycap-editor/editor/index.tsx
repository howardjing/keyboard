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

  const alphanumeric = keyboard.getAlphanumeric();

  const navigation = keyboard.getNavigation();

  const arrows = keyboard.getArrows();
  const up = arrows.get(0);
  const left = arrows.get(1);

  return (
    <Frame>
      <Contextual>
        <PrimarySectionContextual>
          <EscKeycaps>
            <Keycaps keycaps={escape} />
          </EscKeycaps>
          <FunctionKeycaps>
            <Keycaps keycaps={f1} />
            <Keycaps keycaps={f5} />
            <Keycaps keycaps={f9} />
          </FunctionKeycaps>
        </PrimarySectionContextual>
        <SecondarySection>
          <PrintKeycaps>
           <Keycaps keycaps={print} />
          </PrintKeycaps>
        </SecondarySection>
      </Contextual>
      <SectionWrapper>
        <PrimarySection>
          {alphanumeric.map((group, i) => (
            <Keycaps
              key={`alpha-${i}`}
              keycaps={group}
            />
          ))}
        </PrimarySection>
        <SecondarySection>
          <div>
            {navigation.map((group, i) => (
              <Keycaps
                key={`nav-${i}`}
                keycaps={group}
              />
            ))}
          </div>
          <div>
            <Up><Keycaps keycaps={up} /></Up>
            <Keycaps keycaps={left} />
          </div>
        </SecondarySection>
      </SectionWrapper>
    </Frame>
  );
};

const Keycaps: React.SFC<{
  keycaps: List<Cap>,
}> = ({
  keycaps,
}) => (
  <Row keycaps={keycaps}>
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
const SECTION_DIVIDER = 12;

const Frame = styled.div`
  background-color: #2d2d2d;
  padding: ${() => FRAME_BEZEL}px;
  border-top: 2px solid #3c3c3c;
  border-right: 6px solid #585858;
  border-bottom: 8px solid #3c3c3c;
  border-left: 2px solid #585858;
  border-radius: 2px;
  width: ${() => getWidth(18) + SECTION_DIVIDER}px;
`;

const Contextual = styled.div`
  display: flex;
  margin-bottom: ${() => FRAME_BEZEL * 2}px;
`;

const ContextualRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PrimarySection = styled.div`
  width: ${() => getWidth(15)}px;
`;

const PrimarySectionContextual = styled.div`
  width: ${() => getWidth(15)}px;
  display: flex;
`;

const SecondarySection = styled.div`
  margin-left: ${() => SECTION_DIVIDER}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EscKeycaps = styled.div`
  width: ${() => getWidth(2)}px;
`;

const FunctionKeycaps = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${() => getWidth(13)}px;
`;

const PrintKeycaps = styled.div`
  width: ${() => getWidth(3)}px;
`;

const SectionWrapper = styled.div`
  display: flex;
`;

const Up = styled.div`
  width: ${() => getWidth(2)}px;
  display: flex;
  justify-content: flex-end;
`;

const _Row: React.SFC<{
  className?: string,
  keycaps: List<Cap>,
}> = ({
  className,
  children,
}) => (
  <div className={className}>
    {children}
  </div>
);

const Row = styled(_Row)`
  display: flex;
  justify-content: space-between;
  width: ${({ keycaps }) => getRowWidth(keycaps)}px;
`;

const getWidth = (normalizedWidth: number): number => {
  const totalWidth = normalizedWidth * KEYCAP_BASE;
  const totalMargin = (normalizedWidth - 1) * MARGIN_WIDTH;
  return totalWidth + totalMargin;
};

const getRowWidth = (keycaps: List<Cap>): number => {
  const totalNormalizedWidth = keycaps.reduce((sum, cap) => (
    sum + cap.getWidth()
  ), 0);

  return getWidth(totalNormalizedWidth);
}

export default Editor;
