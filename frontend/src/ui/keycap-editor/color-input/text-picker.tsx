import * as React from 'react';
import * as Color from 'color';
import Input from '../../_common/input';

type PropTypes = {
  color: Color.Color | null,
  onColorChange: (color: Color.Color) => any,
};

class TextPicker extends React.Component<PropTypes, {
  text: string,
}> {
  state = {
    text: '',
  };

  componentWillMount() {
    this.setColor(this.props.color);
  }

  componentWillReceiveProps(next: PropTypes) {
    if (next.color !== this.props.color) {
      this.setColor(next.color);
    }
  }

  setColor = (color: Color.Color | null) => {
    this.setState(() => ({
      text: color ? color.hex() : '',
    }));
  };

  handleInputChange = (string: string) => {
    // for some reason, empty string converts to black color
    // here we explicitly say empty string means no color was chosen
    if (!string) {
      this.setState(() => ({
        text: '',
      }));
      return;
    }

    // HACK: input isn't great if you manually enter a hex code,
    // let's make it so that we don't even attempt to convert to a color
    // if you're under 7 characters
    if (string.startsWith('#') && string.length < 7) {
      this.setState(() => ({
        text: string,
      }))
      return;
    }

    try {
      const color = Color(string);
      const { onColorChange } = this.props;

      // update local color
      this.setState(() => ({
        text: color.hex(),
      }));

      // let world know about new color
      onColorChange(color);
    } catch (e) {
      // not a color yet, just update the text input
      this.setState(() => ({
        text: string,
      }));
    }
  }

  render() {
    const { text } = this.state;
    return (
      <Input
        type="text"
        value={text}
        placeholder="#ffffff"
        onChange={this.handleInputChange}
      />
    )

  }
}

export default TextPicker;
