import * as React from 'react';
import styled from 'styled-components';

const POINTER_SIZE = 14;

class Pointer extends React.PureComponent<{
  className?: string,
  x: number,
  y: number,
}, {}> {
  render() {
    const {
      className,
      x,
      y,
    } = this.props;
    return (
      <div
        className={className}
        style={{
          // backgroundColor: color,
          left: `${x - POINTER_SIZE / 2}px`,
          top: `${y - POINTER_SIZE / 2}px`,
        }}
      />
    )
  }
}

export default styled(Pointer)`
  position: absolute;
  box-sizing: border-box;
  width: ${() => POINTER_SIZE}px;
  height: ${() => POINTER_SIZE}px;
  border-radius: 50%;
  border: 2px solid white;
  clip-path: circle(${() => POINTER_SIZE}px at center);
`;
