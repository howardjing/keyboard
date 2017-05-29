import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Keycap as Cap } from '../../../domains/keycap-editor/keyboard';

const KEYCAP_BASE = 50;

const Keycap: React.SFC<{
  keycap: Cap,
  isActive: boolean,
}> = ({
  keycap,
  isActive,
}) => {
  const width = keycap.getWidth();
  const backgroundColor = keycap.getBackgroundColor();
  const legendColor = keycap.getLegendColor();
  const primaryLabel = keycap.getPrimaryLabel();
  const secondaryLabel = keycap.getSecondaryLabel();

  return (
    <Outercap
      width={width}
      backgroundColor={backgroundColor}
      isActive={isActive}
    >
      <Innercap
        backgroundColor={backgroundColor}
        legendColor={legendColor}
      >
        <span>{primaryLabel}</span>
        <span>{secondaryLabel}</span>
      </Innercap>
    </Outercap>
  );
}

const _Outercap: React.SFC<{
  className?: string,
  width: number
  backgroundColor: string,
  isActive: boolean,
}> = ({
  className,
  width,
  backgroundColor,
  children,
}) => (
  <div className={className}>
    {children}
  </div>
);

const Outercap = styled(_Outercap)`
  display: flex;
  flex: 0 0 auto;
  background-color: ${(props) => darken(0.1, props.backgroundColor)};
  box-sizing: border-box;
  border-radius: 5px;
  width: ${props => props.width * KEYCAP_BASE}px;
  height: ${() => KEYCAP_BASE}px;
  margin: 1px 0;
  box-shadow: ${({ isActive }) => isActive ? '0 0 16px #a0c8f0' : 'none' };
`;

const _Innercap: React.SFC<{
  className?: string,
  backgroundColor: string,
  legendColor: string,
}> = ({
  className,
  children,
  backgroundColor,
  legendColor,
}) => (
  <div className={className}>
    {children}
  </div>
);

const Innercap = styled(_Innercap)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 98%;
  height: 90%;
  padding: 2px;
  flex: 0 0 auto;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.legendColor};
  border-radius: 3px;
  font-size: 12px;
`;

export default Keycap;
export {
  KEYCAP_BASE,
};
