import {
  PerspectiveCamera,
  Scene,
} from 'three';
import Keyboard from '../../../domains/keycap-editor/keyboard';
import buildKeyboardScene from '../_common/build-keyboard-scene';
import RaytracingRenderer from './raytracing-renderer';

class KeyboardWebGlRenderer {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: any; // RaytracingRenderer

  static build(el: HTMLCanvasElement): KeyboardWebGlRenderer {
    return new this(el);
  }

  // TOOD: figure out how to pass in an el
  constructor(el: HTMLCanvasElement) {
    this.renderer = new RaytracingRenderer({ canvas: el });
    const width = 1280;
    const height = 720;
    this.renderer.setSize(width, height);

    // TOOD: should camera be part of build-keyboard-scene?
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 12;
    this.camera = camera;
  }

  setKeyboard(keyboard: Keyboard): this {
    this.scene = buildKeyboardScene(keyboard);
    return this;
  }

  render(): HTMLCanvasElement {
    const {
      scene,
      camera,
      renderer,
    } = this;

    renderer.render(scene, camera);

    return renderer.domElement;
  }
}

export default KeyboardWebGlRenderer;

