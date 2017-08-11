import * as React from 'react';
import styled from 'styled-components';
import * as CameraIcon from 'react-icons/lib/fa/video-camera';
import KeyboardRenderer from './keyboard-webgl-renderer';
import KeyboardModel from '../../../domains/keycap-editor/keyboard';
import IconLabel from '../../_common/icon-label';

const WIDTH = 1200;
const HEIGHT = 450;

class Keyboard extends React.Component<{
  keyboard: KeyboardModel,
}, {}> {

  private resolve: any;

  private renderer: Promise<KeyboardRenderer> = new Promise((resolve) => {
    this.resolve = resolve;
  }) as Promise<KeyboardRenderer>;

  private handleCanvas = (el: HTMLCanvasElement) => {
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

  private resetCamera = () => {
    this.renderer.then(renderer => renderer.resetCamera());
  }

  render() {
    return (
      <Wrapper>
        <canvas
          style={{
            cursor: 'pointer',
            width: `${WIDTH}px`,
            height: `${HEIGHT}px`,
          }}
          ref={this.handleCanvas}
        />
        <Button onClick={this.resetCamera}><CameraIcon /><IconLabel>Recenter</IconLabel></Button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
`

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px 10px;
  cursor: pointer;
`;

export default Keyboard;
