import * as React from 'react';
import renderKeyboard from './render-keyboard';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {
  canvas: HTMLCanvasElement,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    this.setState(() => ({ canvas: el }));

    const { keyboard } = this.props;
    renderKeyboard(el, keyboard);
  };

  componentWillReceiveProps({ keyboard: newKeyboard }) {
    const { keyboard } = this.props;
    if (keyboard !== newKeyboard) {
      // TODO: add cleanup logic, pretty sure this causes a memory leak
      renderKeyboard(this.state.canvas, keyboard);
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
