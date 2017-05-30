import * as React from 'react';
import renderKeyboard from './render-keyboard';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    const { keyboard } = this.props;
    renderKeyboard(el, keyboard);
  };

  render() {
    return (
      <canvas
        ref={this.handleCanvas}
      />
    );
  }

}

export default Keyboard;
