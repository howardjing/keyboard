import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import * as Color from 'color';
import { Keycap as Cap } from '../../../../domains/keycap-editor/keyboard';
import { KEYCAP_BASE } from './index';

const toRgb = (color: Color): string => (
  color.rgb().string()
);

const Keycap: React.SFC<{
  keycap: Cap,
  isActive: boolean,
  handleMouseDown: (e: React.MouseEvent<any>) => any,
  handleMouseEnter: (e: React.MouseEvent<any>) => any,
}> = ({
  keycap,
  isActive,
  handleMouseDown,
  handleMouseEnter,
}) => {
  const width = keycap.getWidth();
  const backgroundColor = toRgb(keycap.getBackgroundColor());
  const legendColor = toRgb(keycap.getLegendColor());
  const primaryLabel = keycap.getPrimaryLabel();
  const secondaryLabel = keycap.getSecondaryLabel();

  return (
    <Outercap
      width={width}
      backgroundColor={backgroundColor}
      isActive={isActive}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
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
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => any,
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => any,
}> = ({
  className,
  onMouseDown,
  onMouseEnter,
  width,
  backgroundColor,
  children,
}) => (
  <div
    className={className}
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    style={{
      backgroundColor: darken(0.1, backgroundColor),
    }}
  >
    {children}
  </div>
);

const Outercap = styled(_Outercap)`
  display: flex;
  flex: 0 0 auto;
  box-sizing: border-box;
  border-radius: 5px;
  width: ${props => props.width * KEYCAP_BASE}px;
  height: ${() => KEYCAP_BASE}px;
  margin: 1px 0;
  box-shadow: ${({ isActive }) => isActive ? '0 0 16px #bbddff' : 'none' };
  cursor: pointer;
  user-select: none;
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
  <div
    className={className}
    style={{
      backgroundColor,
      color: legendColor,
    }}
  >
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
  border-radius: 3px;
  font-size: 12px;
`;

export default Keycap;
