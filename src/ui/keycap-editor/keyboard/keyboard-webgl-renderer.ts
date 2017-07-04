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
  animationFrameId?: number;

  static build(el: HTMLCanvasElement): KeyboardWebGlRenderer {
    return new this(el);
  }

  constructor(el: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({
      canvas: el,
      antialias: true,
    });
    const width = 1200;
    const height = 450;
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff);
    // TOOD: should camera be part of build-keyboard-scene?
    const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.y = -0.5;
    camera.position.z = 6.5;
    this.controls = new OrbitControls(camera, this.renderer.domElement);
  }
  setKeyboard(keyboard: Keyboard): this {
    this.scene = buildKeyboardScene(keyboard);
    return this;
  }

  render(): this {
    console.log("RENDER")
    this.animate();
    this.renderer.render(this.scene, this.controls.object);
    return this;
  }

  animate = () => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const {
      controls,
      scene,
      renderer,
    } = this;

    const camera: PerspectiveCamera = controls.object;
    controls.update();
    renderer.render(scene, camera);
  }

  cleanup = () => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

export default KeyboardWebGlRenderer;
