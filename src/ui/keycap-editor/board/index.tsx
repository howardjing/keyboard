import * as React from 'react';
import renderKeyboard from './render-keyboard';

class Board extends React.Component<{
}, {
  canvas?: HTMLCanvasElement,
}> {

  handleCanvas = (el: HTMLCanvasElement) => {
    this.setState({
      canvas: el,
    });

    renderKeyboard(el);
  };

  render() {
    return (
      <canvas
        ref={this.handleCanvas}
      />
    );
  }

}

export default Board;
