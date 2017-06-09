import * as React from 'react';
import Keyboard from '../../../domains/keycap-editor/keyboard';
import RaytracerRenderer from './keyboard-raytracer-renderer';

interface PropTypes {
  keyboard: Keyboard,
};

class RaytracedKeyboard extends React.Component<PropTypes, {}> {
  handleEl = (el: HTMLCanvasElement) => {
    console.log("HANDLE EL")
    const { keyboard } = this.props;
    const canvas = new RaytracerRenderer(el)
      .setKeyboard(keyboard)
      .render();
  }

  render() {
    return (
      <canvas
        ref={this.handleEl}
      ></canvas>
    );
  }
}

export default RaytracedKeyboard;
