import * as React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import toDollars from './to-dollars';
import Amount from './amount';

type PropTypes = {
  cents: number,
  active: boolean,
  onClick: (cents: number) => any,
};

class FixedAmount extends React.PureComponent<PropTypes, {}> {
  handleClick = () => {
    const { cents, onClick } = this.props;
    onClick(cents);
  };

  render() {
    const { active, cents } = this.props;
    const amount = toDollars(cents);
    return (
      <Amount onClick={this.handleClick} active={active}>
        ${amount}
      </Amount>
    );
  }
}

export default FixedAmount;
