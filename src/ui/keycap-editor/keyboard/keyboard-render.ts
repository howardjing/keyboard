import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
  Vector3,
  Object3D,
} from 'three';
import { List } from 'immutable';
import Keyboard, { Keycap } from '../../../domains/keycap-editor/keyboard';
import OrbitControls from './orbit-controls';

class KeyboardRender {
  keyboard: Keyboard;

  scene: Scene;
  controls: any;
  renderer: WebGLRenderer;

  static build(el: HTMLCanvasElement): KeyboardRender {
    return new this(el);
  }

  constructor(el: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas: el });
    this.renderer.setSize(1000, 500); // TODO: hardcoded

    this.scene = new Scene();

    const camera = new PerspectiveCamera(75, 2, 0.1, 1000);
    camera.position.z = 10;
    this.controls = new OrbitControls(camera, this.renderer.domElement);
  }

  setKeyboard(keyboard: Keyboard): this {
    this.keyboard = keyboard;

    const render = new Object3D();
    const contextual = buildContextualRow(keyboard);
    const alphanumerics = buildAlphanumerics(keyboard);
    // hardcoded
    contextual.position.x = -17 / 2;
    contextual.position.y = 3.5;
    alphanumerics.position.x = -17 / 2;
    alphanumerics.position.y = 2;

    render.add(alphanumerics);
    render.add(contextual);

    // clear scene
    const { scene } = this;
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    // add new keyboard
    this.scene.add(render);

    return this;
  }

  render(): this {
    this.animate();
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

const buildContextualRow = (keyboard: Keyboard) => {
  const contextual = keyboard.getContextual();
  const escape = buildRow(contextual.get(0), 2);
  const f1 = buildRow(contextual.get(1), 4.333);
  const f5 = buildRow(contextual.get(2), 4.333);
  const f9 = buildRow(contextual.get(3), 4.333);
  const print = buildRow(contextual.get(4), 3);

  let offsetX = 0;
  const contextualRow = new Object3D();
  contextualRow.add(escape);

  // TODO: figue out what padding should be
  offsetX += 2.5;
  f1.position.x = offsetX;
  contextualRow.add(f1);

  offsetX += 5;
  f5.position.x = offsetX;
  contextualRow.add(f5);

  offsetX += 5;
  f9.position.x = offsetX;
  contextualRow.add(f9);

  offsetX += 5;
  print.position.x = offsetX;
  contextualRow.add(print);

  return contextualRow;
}

const buildAlphanumerics = (keyboard: Keyboard) => {
  const alphanumeric = keyboard.getAlphanumeric();

  const baseHeight = alphanumeric.size;
  const targetHeight = baseHeight + 0.5;
  const totalPaddingY = targetHeight - baseHeight;
  const marginalPaddingY = totalPaddingY / (alphanumeric.size - 1);
  let offsetY = 0;

  const keysContainer = new Object3D();

  const rows = alphanumeric.map(group => {
    const row = buildRow(group, 17);
    row.position.y = offsetY;
    offsetY -= 1 + marginalPaddingY;
    return row;
  }) as List<Object3D>;

  rows.forEach(mesh => {
    keysContainer.add(mesh);
  });

  return keysContainer;
}

const buildRow = (
  caps: List<Keycap>,
  targetWidth: number,
): Object3D => {
  const totalWidth = caps.reduce((sum, cap) => (
    sum + cap.getWidth()
  ), 0);

  const totalPaddingX = targetWidth - totalWidth;
  const marginalPaddingX = totalPaddingX / (caps.size - 1);

  let offsetX = 0;
  const capMeshes = caps.map((cap, i) => {
    const keycap = buildKeycap(cap);
    const keyWidth = cap.getWidth();

    keycap.position.x = offsetX + keyWidth / 2;
    offsetX += keyWidth + marginalPaddingX;

    return keycap;
  });

  const row = new Object3D();
  capMeshes.forEach(mesh => {
    row.add(mesh);
  });

  return row;
};

const buildKeycap = (keycap: Keycap) => {
  const width = keycap.getWidth();
  const geometry = new BoxGeometry(width, 1, 1);
  const material = new MeshBasicMaterial({ color: keycap.getBackgroundColor(), wireframe: true });
  return new Mesh(geometry, material);
};

export default KeyboardRender;
