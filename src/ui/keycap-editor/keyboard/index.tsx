import * as React from 'react';
import KeyboardRenderer from './keyboard-webgl-renderer';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

class Keyboard extends React.PureComponent<{
  keyboard: KeyboardModel,
}, {
  renderer: KeyboardRenderer,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    const { keyboard } = this.props;
    setTimeout(() => {
      const renderer = KeyboardRenderer.build(el)
        .setKeyboard(keyboard)
        .render();

      this.setState(() => ({
        renderer,
      }));
    }, 0);
  };

  componentWillReceiveProps({ keyboard }) {
    const { keyboard: oldKeyboard } = this.props;
    if (keyboard !== oldKeyboard) {
      const { renderer } = this.state;
      setTimeout(() => {
        renderer.setKeyboard(keyboard);
      }, 0);
    }
  }

  render() {
    return (
      <canvas
        style={{ cursor: 'pointer' }}
        ref={this.handleCanvas}
      />
    );
  }

}

export default Keyboard;
