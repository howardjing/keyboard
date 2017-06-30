import * as React from 'react';
import styled from 'styled-components';

class Swatch extends React.PureComponent<{
  className?: string,
  color: string,
  onClick: (color: string) => any,
}, {}> {

  handleClick = () => {
    const {
      onClick,
      color,
    } = this.props;

    onClick(color);
  };

  render() {
    const {
      className,
    } = this.props;

    return (
      <div
        className={className}
        onClick={this.handleClick}
      />
    );
  }
}

const Colored = styled(Swatch)`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

export default Colored;
