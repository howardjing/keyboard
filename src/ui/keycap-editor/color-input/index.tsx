import * as React from 'react';
import * as Color from 'color';
import styled from 'styled-components';
import Swatch from '../swatch';
import ColorPicker from '../color-picker';
import Dismissible from '../_common/dismissible';

const WHITE = Color({ r: 255, g: 255, b: 255 });

class ColorInput extends React.Component<{
  color: Color.Color | null,
  onColorChange: (color: Color.Color, preview?: boolean) => any,
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
    const { color, onColorChange } = this.props;
    const { open } = this.state;
    const swatchColor = color || WHITE;

    if (!open) {
      return <StyledSwatch color={swatchColor} onClick={this.openPicker} />
    }

    return (
      <span>
        <StyledSwatch color={swatchColor} />
        <StyledDismissible onDismiss={this.closePicker}>
          <ColorPicker color={color} onColorChange={onColorChange} />
        </StyledDismissible>
      </span>
    )
  }
}

const StyledDismissible = styled(Dismissible)`
  border: 1px solid black;
`;

const StyledSwatch = styled(Swatch)`
  cursor: pointer;
`;

export default ColorInput;
