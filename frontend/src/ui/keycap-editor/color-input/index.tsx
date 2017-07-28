import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';
import Swatch from '../swatch';
import Dismissible from '../_common/dismissible';
import GradientPicker from './gradient-picker';
import TextPicker from './text-picker';

const PLACEHOLDER_COLOR = Color('#f1f1f1');

class ColorInput extends React.Component<{
  color: Color.Color | null,
  onColorChange: (color: Color.Color, preview?: boolean) => any,
  onOpen?: () => any,
  onClose?: () => any,
  children?: any,
}, {
  open: boolean,
}> {

  state = {
    open: false,
  };

  openPicker = () => {
    const { onOpen } = this.props;

    this.setState(() => ({
      open: true,
    }));

    if (onOpen) {
      onOpen();
    }
  };

  closePicker = () => {
    const { onClose } = this.props;

    this.setState(() => ({
      open: false,
    }));

    if (onClose) {
      onClose();
    }
  };

  render() {
    const { color, onColorChange, children } = this.props;
    const { open } = this.state;
    const swatchColor = color || PLACEHOLDER_COLOR;
    const width = 60;
    const height = 20;

    const handleClick = open ? undefined : this.openPicker;
    const swatch = (
      <Wrapper>
        <StyledSwatch
          color={swatchColor}
          width={width}
          height={height}
          onClick={handleClick}
        />
        {color ? <Label>{color.hex()}</Label> : null}
      </Wrapper>
    );

    if (!open) {
      return swatch;
    }

    return (
      <Wrapper>
        {swatch}
        <StyledDismissible onDismiss={this.closePicker}>
          <GradientPicker color={swatchColor} onColorChange={onColorChange} />
          <CustomPicker>
            <TextPicker color={color} onColorChange={onColorChange} />
            {children}
          </CustomPicker>
        </StyledDismissible>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
`;

const StyledDismissible = styled(Dismissible)`
  z-index: 1;
  display: flex;
  position: absolute;
  right: 0;
  margin: 10px 0;
  background-color: #f1f1f1;
  padding: 10px;
`;

const CustomPicker = styled.div`
  background-color: #fff;
  margin-left: 10px;
  padding: 10px;
`;

const StyledSwatch = styled(Swatch)`
  cursor: pointer;
`;

const Label = styled.div`
  display: inline-block;
  margin-left: 10px;
  font-size: 12px;
  width: 60px;
  line-height: 2;
`;

export default ColorInput;
