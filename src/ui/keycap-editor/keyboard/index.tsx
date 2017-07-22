import * as React from 'react';
import KeyboardRenderer from './keyboard-webgl-renderer';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

const WIDTH = 1200;
const HEIGHT = 450;

class Keyboard extends React.PureComponent<{
  keyboard: KeyboardModel,
}, {
  renderer: KeyboardRenderer,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    const { keyboard } = this.props;
    setTimeout(() => {
      const renderer = KeyboardRenderer
        .build(el, keyboard, { width: WIDTH, height: HEIGHT })
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

  componentWillUnmount() {
    const { renderer } = this.state;
    renderer.cleanup();
  }

  render() {
    return (
      <canvas
        style={{
          cursor: 'pointer',
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
        }}
        ref={this.handleCanvas}
      />
    );
  }

}

export default Keyboard;
