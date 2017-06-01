import * as React from 'react';
import renderKeyboard, { KeyboardRender } from './render-keyboard';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {
  canvas: HTMLCanvasElement,
  keyboardRender: KeyboardRender,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    const { keyboard } = this.props;
    const keyboardRender = renderKeyboard(el, keyboard);

    this.setState(() => ({
      canvas: el,
      keyboardRender,
    }))
  };

  componentWillReceiveProps({ keyboard }) {
    const { keyboard: oldKeyboard } = this.props;
    if (keyboard !== oldKeyboard) {
      renderKeyboard(this.state.canvas, keyboard);

      // clean up
      const { keyboardRender } = this.state;
      keyboardRender.destroy();
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
