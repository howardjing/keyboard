import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
} from 'three';
import Keyboard from '../../../domains/keycap-editor/keyboard';
import OrbitControls from './orbit-controls';
import buildKeyboardScene from '../_common/build-keyboard-scene';

class KeyboardWebGlRenderer {
  scene: Scene;
  controls: any;
  renderer: WebGLRenderer;

  static build(el: HTMLCanvasElement): KeyboardWebGlRenderer {
    return new this(el);
  }

  constructor(el: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas: el });
    const width = 800;
    const height = 450;
    this.renderer.setSize(width, height);

    // TOOD: should camera be part of build-keyboard-scene?
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.y = -5
    camera.position.z = 12;
    this.controls = new OrbitControls(camera, this.renderer.domElement);
  }

  setKeyboard(keyboard: Keyboard): this {
    this.scene = buildKeyboardScene(keyboard);
    return this;
  }

  render(): this {
    this.animate();
    this.renderer.render(this.scene, this.controls.object);
    return this;
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    const {
      controls,
      scene,
      renderer,
    } = this;

    const camera: PerspectiveCamera = controls.object;
    controls.update();
    renderer.render(scene, camera);
  }
}

export default KeyboardWebGlRenderer;
