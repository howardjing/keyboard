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
import Keyboard from '../../../domains/keycap-editor/keyboard';

import OrbitControls from './orbit-controls';

const renderKeyboard = (el: HTMLCanvasElement, keyboard: Keyboard) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 2, 0.1, 1000);
  camera.position.z = 10;

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });

  const alphanumerics = buildAlphanumerics(keyboard);

  // hardcoded to be keyboard midpoint
  alphanumerics.position.x = -17 / 2;
  alphanumerics.position.y = 4 / 2;

  scene.add(alphanumerics);

  const renderer = new WebGLRenderer({ canvas: el });
  renderer.setSize(1000, 500);

  const controls = new OrbitControls(camera, renderer.domElement);

  const render = () => {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  render();
};

const buildAlphanumerics = (keyboard: Keyboard) => {
  const alphanumeric = keyboard.getAlphanumeric();

  const baseHeight = alphanumeric.size;
  const targetHeight = baseHeight + 0.5;
  const totalPaddingY = targetHeight - baseHeight;
  const marginalPaddingY = totalPaddingY / (alphanumeric.size - 1);
  let offsetY = 0;

  const keysContainer = new Object3D();
  const meshes = alphanumeric.flatMap(group => {
    const keysWidth = group.reduce((sum, key) => sum + key.getWidth(), 0);
    const targetWidth = keysWidth + 2;

    const totalPaddingX = targetWidth - keysWidth;
    const marginalPaddingX = totalPaddingX / (group.size - 1);

    let offsetX = 0;
    const row = group.map((key, i) => {
      const geometry = new BoxGeometry(key.getWidth(), 1, 1);
      const material = new MeshBasicMaterial({ color: 0xeeeeee, wireframe: true });
      const mesh = new Mesh(geometry, material);

      mesh.position.y = offsetY;
      mesh.position.x = offsetX + key.getWidth() / 2;
      offsetX += key.getWidth() + marginalPaddingX;

      return mesh;
    });

    offsetY -= 1 + marginalPaddingY;
    return row;
  });

  meshes.forEach(mesh => {
    keysContainer.add(mesh);
  })

  return keysContainer;
}

export default renderKeyboard;
