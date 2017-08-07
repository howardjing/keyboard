import * as React from 'react';
import styled from 'styled-components';
import * as ClipboardIcon from 'react-icons/lib/fa/clipboard';

type PropTypes = {
  className?: string,
  url: string,
};

class ShareInput extends React.PureComponent<PropTypes, {
  input: HTMLInputElement | null,
}> {
  state = {
    input: null,
  };

  cacheInput = (el: HTMLInputElement | null,) => {
    if (!el) { return; }
    this.setState(() => ({
      input: el,
    }));
  };

  // copy input value to clipboard
  handleClick = () => {
    const { input } = this.state;
    if (!input) { return; }

    input.select();
    document.execCommand('copy');
  };

  render() {
    const {
      className,
      url,
    } = this.props;

    return (
      <div className={className}>
        <StyledInput type="text" readOnly value={url} innerRef={this.cacheInput} />
        <StyledButton><ClipboardIcon onClick={this.handleClick} /></StyledButton>
      </div>
    );
  }
}

const StyledInput = styled.input`
  padding: 5px 10px;
  border-width: 1px;
  border-right-style: none;
`;

const StyledButton = styled.button`
  padding: 5px 10px;
  border-width: 1px;
  border-left-style: none;
  &:focus {
    outline: none;
  }
`;

export default ShareInput;
