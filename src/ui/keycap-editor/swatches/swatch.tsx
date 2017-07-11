import * as React from 'react';
import styled from 'styled-components';

class Swatch extends React.PureComponent<{
  className?: string,
  color: string,
  width?: number,
  height?: number
}, {}> {
  render() {
    const {
      className,
      color,
    } = this.props;

    return (
      <div
        className={className}
        style={{
          backgroundColor: color,
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
