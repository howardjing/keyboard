import * as React from 'react';

interface PropTypes {
  type: string,
  value: string,
  placeholder: string,
  onChange: (value: string) => any,
}

class Input extends React.PureComponent<PropTypes, {}> {
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const { onChange } = this.props;

    onChange(value);
  };

  render() {
    const {
      type,
      value,
      placeholder,
      onChange,
    } = this.props;

    return (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

export default Input;
