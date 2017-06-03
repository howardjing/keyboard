import * as React from 'react';
import KeyboardRender from './keyboard-render';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {
  keyboardRender: KeyboardRender,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    const { keyboard } = this.props;
    const keyboardRender = KeyboardRender.build(el)
      .setKeyboard(keyboard)
      .render();

    this.setState(() => ({
      keyboardRender,
    }))
  };

  componentWillReceiveProps({ keyboard }) {
    const { keyboard: oldKeyboard } = this.props;
    if (keyboard !== oldKeyboard) {
      const { keyboardRender } = this.state;
      keyboardRender.setKeyboard(keyboard);
    }
  }

  render() {
    return (
      <canvas
        ref={this.handleCanvas}
      />
    );
  }

}

export default Keyboard;
