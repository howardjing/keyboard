import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  PCFSoftShadowMap,
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
    this.renderer = new WebGLRenderer({
      canvas: el,
      antialias: true,
    });
    const width = 1200;
    const height = 675;
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff);
    // TOOD: should camera be part of build-keyboard-scene?
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.y = -2;
    camera.position.z = 9;
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
