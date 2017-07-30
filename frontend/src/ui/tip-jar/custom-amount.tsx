import * as React from 'react';
import styled from 'styled-components';
import Input from '../_common/input';
import Amount from './amount';
import toDollars from './to-dollars';

type PropTypes = {
  cents?: number,
  active: boolean,
  onClick: () => any,
  onChange: (cents: number | null) => any,
};

const toCents = (n: number) => Math.round(n * 100);

class CustomAmount extends React.PureComponent<PropTypes, {
  input: Input,
}> {
  cacheInput = (input) => {
    if (!input) { return; }
    this.setState(() => ({
      input,
    }));
  };

  handleClick = () => {
    const { input } = this.state;
    if (!input) { return; }
    input.focus();

    const { onClick } = this.props;
    onClick();
  };

  handleChange = (numberString: string) => {
    const { onChange } = this.props;

    if (!numberString) {
      onChange(null);
      return;
    }

    const dollars = parseFloat(numberString);
    onChange(toCents(dollars));
  }

  render() {
    const { cents, active } = this.props;
    const amount = cents ? toDollars(cents) : '';
    return (
      <Amount onClick={this.handleClick} active={active}>
        <InputWrapper>
          <CurrencyIcon>$&nbsp;</CurrencyIcon>
          <StyledInput
            innerRef={this.cacheInput}
            type="number"
            min={1}
            max={100}
            step={0.01}
            onChange={this.handleChange}
            placeholder="Other"
            value={amount}
          />
        </InputWrapper>
      </Amount>
    )
  }
}

const InputWrapper = styled.div`
  display: flex;
`;

const CurrencyIcon = styled.div`
  font-size: 16px;
`;

const StyledInput = styled(Input)`
  border: 0;
  border-bottom: 1px solid black;
  width: 60px;
  font-size: 16px;
  background-color: inherit;
  &::placeholder
    color: #333;
  }
`;

export default CustomAmount;
