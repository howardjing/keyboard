import {
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  WebGLRenderer,
} from 'three';

import OrbitControls from './orbit-controls';

const renderKeyboard = (el: HTMLCanvasElement) => {
  const scene = new Scene();

  const camera = new PerspectiveCamera(75, 2, 0.1, 1000);
  camera.position.z = 5;

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new WebGLRenderer({ canvas: el });
  renderer.setSize(800, 400);

  const controls = new OrbitControls(camera, renderer.domElement);

  const render = () => {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }

  render();
};

export default renderKeyboard;
