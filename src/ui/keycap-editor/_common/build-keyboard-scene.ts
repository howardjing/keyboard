import {
  Scene,
  BoxGeometry,
  MeshPhongMaterial,
  MeshLambertMaterial,
  Mesh,
  Vector3,
  Object3D,
  SpotLight,
  CameraHelper,
  SpotLightHelper,
  AmbientLight,
} from 'three';
import { List } from 'immutable';
import Keyboard, { Keycap } from '../../../domains/keycap-editor/keyboard';
import STLLoader from './stl-loader';

import dsa1 from './dsa-1';
import dsa125 from './dsa-1.25';
import dsa15 from './dsa-1.5';
import dsa175 from './dsa-1.75';
import dsa2 from './dsa-2';
import dsa225 from './dsa-2.25';
import dsa275 from './dsa-2.75';
import dsaspacebar from './dsa-spacebar';

const loader = new (STLLoader as any)();
const DSA_1_GEOMETRY = loader.parseASCII(dsa1);
const DSA_1_25_GEOMETRY = loader.parseASCII(dsa125);
const DSA_1_5_GEOMETRY = loader.parseASCII(dsa15);
const DSA_1_75_GEOMETRY = loader.parseASCII(dsa175);
const DSA_2_GEOMETRY = loader.parseASCII(dsa2);
const DSA_2_25_GEOMETRY = loader.parseASCII(dsa225);
const DSA_2_75_GEOMETRY = loader.parseASCII(dsa275);
const DSA_SPACEBAR = loader.parseASCII(dsaspacebar);

const buildScene = (keyboard: Keyboard): Scene => {
  const scene = new Scene();
  const render = new Object3D();
  const keys = new Object3D();
  const contextual = buildContextualRow(keyboard);
  const alphanumerics = buildAlphanumerics(keyboard);
  const navigation = buildNavigation(keyboard);
  const arrows = buildArrows(keyboard);
  const casing = buildCase(23.25, 8.25, 1);

  // hardcoded
  contextual.position.x = -17 / 2;
  contextual.position.y = 3.5;
  alphanumerics.position.x = -17 / 2;
  alphanumerics.position.y = 2;
  navigation.position.x = 9;
  navigation.position.y = 2;
  arrows.position.x = 9;
  arrows.position.y = -2.5

  casing.position.x = 2;
  casing.position.y = 0.5;
  keys.position.z = 0.7;

  keys.add(alphanumerics)
  keys.add(contextual);
  keys.add(navigation);
  keys.add(arrows);

  render.position.x = -2.5; // TODO: don't hardcode
  render.add(keys);
  render.add(casing);

  // clear scene
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  // add lighting
  const light = new SpotLight();
  light.position.set(-10, 10, 10);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(new CameraHelper(light.shadow.camera))
  scene.add(new SpotLightHelper(light));
  scene.add(light)
  scene.add(new AmbientLight(0xffffff, 0.2));

  // add new keyboard
  scene.add(render);

  return scene;
}

const buildContextualRow = (keyboard: Keyboard) => {
  const contextual = keyboard.getContextual();
  const escape = buildRow(contextual.get(0), 2);
  const f1 = buildRow(contextual.get(1), 4.333);
  const f5 = buildRow(contextual.get(2), 4.333);
  const f9 = buildRow(contextual.get(3), 4.333);
  const print = buildRow(contextual.get(4), 3.25);

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

const buildCase = (width: number, height: number, depth: number) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = new MeshPhongMaterial({ color: 0x1a1a1a });
  const mesh = new Mesh(geometry, material);

  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

const buildArrows = (keyboard: Keyboard) => {
  const arrows = keyboard.getArrows();
  const up = arrows.get(0);
  const left = arrows.get(1);

  const upRow = buildRow(up, 1);
  upRow.position.x = 1.15;
  const leftRow = buildRow(left, 3.25);
  upRow.position.y = 1.15;

  const arrowRow = new Object3D();
  arrowRow.add(upRow);
  arrowRow.add(leftRow);

  return arrowRow;
}

const buildNavigation = (keyboard: Keyboard) => (
  buildSection(keyboard.getNavigation(), 3.25, 2.25)
);

const buildAlphanumerics = (keyboard: Keyboard) => (
  buildSection(keyboard.getAlphanumeric(), 16, 5.2)
);

const buildSection = (section: List<List<Keycap>>, targetWidth: number, targetHeight: number) => {
  const baseHeight = section.size;
  const totalPaddingY = targetHeight - baseHeight;
  const marginalPaddingY = totalPaddingY / (section.size - 1);
  let offsetY = 0;

  const rows = section.map(group => {
    const row = buildRow(group, targetWidth);
    row.position.y = offsetY;
    offsetY -= 1 + marginalPaddingY;
    return row;
  }) as List<Object3D>;

  const keysContainer = new Object3D();
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

const SCALAR = 1 / 0.725;
const buildKeycap = (keycap: Keycap) => {
  const width = keycap.getWidth();
  let geometry;
  if (width === 1) {
    geometry = DSA_1_GEOMETRY;
  } else if (width === 1.25) {
    geometry = DSA_1_25_GEOMETRY;
  } else if (width === 1.5) {
    geometry = DSA_1_5_GEOMETRY;
  } else if (width === 1.75) {
    geometry = DSA_1_75_GEOMETRY;
  } else if (width === 2) {
    geometry = DSA_2_GEOMETRY;
  } else if (width === 2.25) {
    geometry = DSA_2_25_GEOMETRY;
  } else if (width === 2.75) {
    geometry = DSA_2_75_GEOMETRY;
  } else if (width === 6.25) {
    geometry = DSA_SPACEBAR;
  } else {
    geometry = new BoxGeometry(SCALAR * width * 0.725, SCALAR * 0.725, SCALAR * 0.291);
    geometry.translate(0, 0, SCALAR * 0.291 / 2);
  }
  const material = new MeshPhongMaterial({
    color: keycap.getBackgroundColor(),
  });
  const mesh = new Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
};

export default buildScene;
