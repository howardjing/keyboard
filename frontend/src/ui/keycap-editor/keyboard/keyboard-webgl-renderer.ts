import {
  PerspectiveCamera,
  WebGLRenderer,
  Scene,
  Mesh,
  Object3D,
  PCFSoftShadowMap,
} from 'three';
import { List } from 'immutable';
import Keyboard, { Keycap } from '../../../domains/keycap-editor/keyboard';
import OrbitControls from './orbit-controls';
import buildKeyboardScene from '../_common/build-keyboard-scene';

const toRgb = (color: Color.Color): string => (
  color.rgb().string()
);

const setColors = (threeJsKeys: Object3D, keys: List<List<Keycap>>) => {
  keys.forEach((row, i) => {
    row.forEach((key, j) => {
      const backgroundColor = key.getBackgroundColor();
      const legendColor = key.getLegendColor();
      // WARNING: unsafe
      const threeJsKey = threeJsKeys.children[i].children[j];
      // HACK: first child is the font mesh
      const threeJsKeyLegend = threeJsKey.children[0];

      setColor(threeJsKey, backgroundColor);

      if (threeJsKeyLegend) {
        setColor(threeJsKeyLegend, legendColor);
      }
    });
  })
};

const setColor = (mesh, color: Color.Color) => {
  mesh.material.color.setStyle(toRgb(color));
};

type KeyboardWebGlRendererOptions = {
  width?: number,
  height?: number,
};

class KeyboardWebGlRenderer {
  scene: Scene;
  controls: any;
  renderer: WebGLRenderer;
  animationFrameId?: number;
  sceneChildren: {
    casing: Mesh,
    contextual: Object3D,
    alphanumerics: Object3D,
    navigation: Object3D,
    arrows: Object3D,
  };

  static build(
    el: HTMLCanvasElement,
    keyboard: Keyboard,
    options: KeyboardWebGlRendererOptions = {}
  ): KeyboardWebGlRenderer {
    return new this(el, keyboard, options);
  }

  constructor(el: HTMLCanvasElement, keyboard: Keyboard, options: KeyboardWebGlRendererOptions) {
    this.renderer = new WebGLRenderer({
      canvas: el,
      antialias: true,
    });
    const width = options.width || 1200;
    const height = options.height || 450;
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setClearColor(0xffffff);
    // TOOD: should camera be part of build-keyboard-scene?
    const camera = new PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.y = -0.5;
    camera.position.z = 7.5;
    this.controls = new OrbitControls(camera, this.renderer.domElement);
    this.controls.enableKeys = false;

    const {
      scene,
      casing,
      contextual,
      alphanumerics,
      navigation,
      arrows,
    } = buildKeyboardScene(keyboard);

    this.scene = scene;
    this.sceneChildren = {
      casing,
      contextual,
      alphanumerics,
      navigation,
      arrows,
    };
  }

  /**
   * TODO: this doesn't handle switching between types of keyboards easily.
   * When I originally tried to empty out the scene + rebuild the scene on keyboard
   * change, ran into some pretty big memory leaks.
   *
   * See https://stackoverflow.com/questions/12945092/memory-leak-with-three-js-and-many-shapes
   */
  setKeyboard(keyboard: Keyboard): this {
    setColors(this.sceneChildren.contextual, keyboard.getContextual());
    setColors(this.sceneChildren.alphanumerics, keyboard.getAlphanumeric());
    setColors(this.sceneChildren.navigation, keyboard.getNavigation());
    setColors(this.sceneChildren.arrows, keyboard.getArrows());
    setColor(this.sceneChildren.casing, keyboard.getCaseColor());
    return this;
  }

  render(): this {
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
