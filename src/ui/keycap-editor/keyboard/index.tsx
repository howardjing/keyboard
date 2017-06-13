import * as React from 'react';
import KeyboardRenderer from './keyboard-webgl-renderer';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {
  renderer: KeyboardRenderer,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    const { keyboard } = this.props;
    const renderer = KeyboardRenderer.build(el)
      .setKeyboard(keyboard)
      .render();

    this.setState(() => ({
      renderer,
    }));
  };

  componentWillReceiveProps({ keyboard }) {
    const { keyboard: oldKeyboard } = this.props;
    if (keyboard !== oldKeyboard) {
      const { renderer } = this.state;
      renderer.setKeyboard(keyboard);
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
