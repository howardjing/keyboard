import * as React from 'react';
import styled from 'styled-components';

class Swatch extends React.PureComponent<{
  className?: string,
  color: Color.Color,
  width?: number,
  height?: number,
  onClick?: () => any,
}, {}> {
  render() {
    const {
      className,
      color,
      onClick,
    } = this.props;

    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          backgroundColor: color.rgb(),
        }}
      />
    );
  }
}

const Colored = styled(Swatch)`
  display: inline-block;
  width: ${({ width }) => width || 10}px;
  height: ${({ height }) => height || 10}px;
  vertical-align: middle;
`;

export default Colored;
