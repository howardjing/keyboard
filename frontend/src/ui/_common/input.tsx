import * as React from 'react';
import styled from 'styled-components';

interface PropTypes {
  className?: string,
  type: string,
  value: string,
  onChange: (value: string) => any,
  placeholder?: string,
  min?: number,
  max?: number,
  step?: number,
}

class Input extends React.PureComponent<PropTypes, {
  el: HTMLInputElement,
}> {

  cacheEl = (el) => {
    if (el) {
      this.setState(() => ({
        el,
      }));
    }
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const { onChange } = this.props;

    onChange(value);
  };

  public focus = () => {
    const { el } = this.state;
    if (!el) { return; }
    el.focus();
  };

  render() {
    const {
      className,
      type,
      value,
      placeholder,
      min,
      max,
      step,
      onChange,
    } = this.props;

    return (
      <StyledInput
        innerRef={this.cacheEl}
        className={className}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={this.handleChange}
      />
    );
  }
}

const StyledInput = styled.input`
  &:focus {
    outline: none;
  }
`;

export default Input;
