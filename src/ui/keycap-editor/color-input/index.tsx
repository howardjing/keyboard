import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';
import Swatch from '../swatch';
import Dismissible from '../_common/dismissible';
import GradientPicker from './gradient-picker';
import TextPicker from './text-picker';

const WHITE = Color({ r: 255, g: 255, b: 255 });

class ColorInput extends React.Component<{
  color: Color.Color | null,
  onColorChange: (color: Color.Color, preview?: boolean) => any,
  children?: any,
}, {
  open: boolean,
}> {

  state = {
    open: false,
  };

  openPicker = () => {
    this.setState(() => ({
      open: true,
    }));
  };

  closePicker = () => {
    this.setState(() => ({
      open: false,
    }));
  };

  render() {
    const { color, onColorChange, children } = this.props;
    const { open } = this.state;
    const swatchColor = color || WHITE;
    const width = 30;
    const height = 20;

    if (!open) {
      return (
      <StyledSwatch
        color={swatchColor}
        width={width}
        height={height}
        onClick={this.openPicker}
      />);
    }

    return (
      <span>
        <StyledSwatch
          color={swatchColor}
          width={width}
          height={height}
        />
        <StyledDismissible onDismiss={this.closePicker}>
          <GradientPicker color={swatchColor} onColorChange={onColorChange} />
          <CustomPicker>
            <TextPicker color={color} onColorChange={onColorChange} />
            {children}
          </CustomPicker>
        </StyledDismissible>
      </span>
    )
  }
}

const StyledDismissible = styled(Dismissible)`
  display: flex;
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

export default ColorInput;
