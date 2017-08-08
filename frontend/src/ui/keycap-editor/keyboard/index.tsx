import * as React from 'react';
import KeyboardRenderer from './keyboard-webgl-renderer';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';

const WIDTH = 1200;
const HEIGHT = 450;

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {}> {

  resolve: any;

  renderer: Promise<KeyboardRenderer> = new Promise((resolve) => {
    this.resolve = resolve;
  }) as Promise<KeyboardRenderer>;

  handleCanvas = (el: HTMLCanvasElement) => {
    if (!el) { return; }
    const { keyboard } = this.props;
    setTimeout(() => {
      const renderer = KeyboardRenderer
        .build(el, keyboard, { width: WIDTH, height: HEIGHT })
        .render();
      this.resolve(renderer);
    }, 0);
  };

  componentWillReceiveProps({ keyboard }) {
    const { keyboard: oldKeyboard } = this.props;
    if (keyboard !== oldKeyboard) {
      this.renderer.then(renderer => renderer.setKeyboard(keyboard));
    }
  }

  componentWillUnmount() {
    this.renderer.then(renderer => renderer.cleanup());
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
