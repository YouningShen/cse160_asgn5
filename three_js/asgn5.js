import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

// === Setup ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

const moveSpeed = 0.2;

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const pokemonList = [];

let grassClumpModel = null;
let treeModel = null;
let tree2Model = null;

// === Lights ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
scene.add(hemisphereLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(10, 50, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const loader = new THREE.TextureLoader();
loader.load('resources/sky.jpg', (texture) => {
  scene.background = texture;
});

// === Controls ===
const controls = new OrbitControls(camera, renderer.domElement);

function loadObjModel(path, onLoad) {
  objLoader.load(
    path,
    obj => {
      obj.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      obj.scale.set(0.5, 0.5, 0.5);
      obj.position.set(Math.random() * 50 - 25, 0, Math.random() * 50 - 25);
      scene.add(obj);
      if (onLoad) onLoad(obj);
    },
    undefined,
    err => console.error(`Failed to load ${path}:`, err)
  );
}

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
mtlLoader.load('resources/models/Cubone/materials.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('resources/models/Cubone/model.obj', (root) => {
      root.position.set(Math.random() * 30 - 15, 0, Math.random() * 30 - 15);
      root.scale.set(1, 1, 1);
      root.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(root);
      pokemonList.push(root);
  });
});

mtlLoader.load('resources/models/Eevee/materials.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('resources/models/Eevee/model.obj', (root) => {
      root.position.set(Math.random() * 30 - 15, 0, Math.random() * 30 - 15);
      root.scale.set(1, 1, 1);
      root.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(root);
      pokemonList.push(root);  
    });
});

mtlLoader.load('resources/models/Low-Poly-Oddish/materials.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('resources/models/Low-Poly-Oddish/model.obj', (root) => {
      root.position.set(Math.random() * 30 - 15, 0, Math.random() * 30 - 15);
      root.scale.set(1, 1, 1);
      root.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(root);
      pokemonList.push(root);  
  });
});

mtlLoader.load('resources/models/Mew/materials.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('resources/models/Mew/model.obj', (root) => {
      root.position.set(Math.random() * 30 - 15, 0.3, Math.random() * 30 - 15);
      root.scale.set(1, 1, 1);
      root.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(root);
      pokemonList.push(root);  
  });
});

mtlLoader.load('resources/models/Pikachu/materials.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('resources/models/Pikachu/model.obj', (root) => {
      root.position.set(Math.random() * 30 - 15, 0, Math.random() * 30 - 15);
      root.scale.set(1, 1, 1);
      root.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(root);
      pokemonList.push(root);  
  });
});

// Preload GRASS model
mtlLoader.load('resources/models/Grass/materials.mtl', (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
  objLoader.load('resources/models/Grass/model.obj', (obj) => {
    grassClumpModel = obj;
  });
});

// Preload TREE models
mtlLoader.load('resources/models/Tree/tree_materials.mtl', (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
  objLoader.load('resources/models/Tree/model.obj', (obj) => {
    treeModel = obj;
  });
});

mtlLoader.load('resources/models/Tree-2/materials.mtl', (mtl) => {
  mtl.preload();
  objLoader.setMaterials(mtl);
  objLoader.load('resources/models/Tree-2/model.obj', (obj) => {
    tree2Model = obj;
  });
});

for (let x = -20; x <= 20; x++) {
  for (let z = -20; z <= 20; z++) {
    mtlLoader.load('resources/models/Grass-Tile/materials.mtl', (mtl) => {
      mtl.preload();
      objLoader.setMaterials(mtl);
      objLoader.load('resources/models/Grass-Tile/model.obj', (tile) => {
        tile.position.set(x * 1, 0, z * 1);
        tile.scale.set(1, 1, 1);
        tile.traverse(child => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        scene.add(tile);

        // Randomly add GRASS
        if (Math.random() < 0.7 && grassClumpModel) {
          const grass = grassClumpModel.clone();
          grass.position.set(x * 1, 0.1, z * 1);
          grass.scale.set(1.5, 1.5, 1.5);
          grass.rotation.y = Math.random() * Math.PI * 2;
          scene.add(grass);
        }

        // Randomly add TREES
        if (Math.random() < 0.15 && treeModel) {
          const tree = treeModel.clone();
          tree.position.set(x * 1, 1.4, z * 1);
          tree.scale.set(1, 1, 1);
          tree.rotation.y = Math.random() * Math.PI * 2;
          scene.add(tree);
        }

        if (Math.random() < 0.15 && tree2Model) {
          const tree2 = tree2Model.clone();
          tree2.position.set(x * 1, 1.7, z * 1);
          tree2.scale.set(1, 1, 1);
          tree2.rotation.y = Math.random() * Math.PI * 2;
          scene.add(tree2);
        }
      });
    });
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (keys.hasOwnProperty(key)) keys[key] = true;
});

document.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();
  if (keys.hasOwnProperty(key)) keys[key] = false;
});

const sunGeometry = new THREE.BoxGeometry(1, 1, 1);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xFDB813, // bright yellow
  emissive: 0xFDB813,
  emissiveIntensity: 1,
});
const sunCube = new THREE.Mesh(sunGeometry, sunMaterial);
sunCube.castShadow = false;
scene.add(sunCube);

// === Animate ===
let time = 0;
let pokemonTime = 0;

function animate() {
  requestAnimationFrame(animate);

  time += 0.01;
  pokemonTime += 0.01;
  const sunRadius = 20;
  const orbitRadius = 5;
  const sunX = Math.sin(time) * sunRadius;
  const sunY = Math.cos(time) * sunRadius;
  const normalizedSunY = THREE.MathUtils.clamp((sunY + 100) / 200, 0, 1);
  const nightColor = new THREE.Color(0x000010);  // dark blue
  const dayColor = new THREE.Color(0x87ceeb);   // light sky blue
  const currentSky = nightColor.clone().lerp(dayColor, normalizedSunY);
  const lightFactor = THREE.MathUtils.clamp((sunY + 100) / 200, 0, 1);
  const sunsetColor = new THREE.Color(0xff4500); // orange red
  const noonColor = new THREE.Color(0xFDB813);   // bright yellow
  const currentSunColor = sunsetColor.clone().lerp(noonColor, lightFactor);

  scene.background = currentSky;

  // Update sunCube position
  sunCube.position.set(sunX, sunY, 0);

  sunCube.scale.set(3, 3, 3);
  sunCube.rotation.y += 0.01;
  sunCube.rotation.x += 0.005;

  directionalLight.position.set(sunX, sunY, 0);
  directionalLight.intensity = 1.0 * lightFactor;
  ambientLight.intensity = 0.05 + 0.25 * lightFactor; 
  directionalLight.color.setHSL(0.08 + 0.1 * (1 - lightFactor), 1, 0.5);
  sunMaterial.color = currentSunColor;
  sunMaterial.emissive = currentSunColor;

  const movement = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  cameraDirection.y = 0;
  cameraDirection.normalize();

  const cameraRight = new THREE.Vector3();
  cameraRight.crossVectors(cameraDirection, camera.up).normalize();

  if (keys.w) {
    movement.add(cameraDirection.clone().multiplyScalar(moveSpeed));
  }
  if (keys.s) {
    movement.add(cameraDirection.clone().multiplyScalar(-moveSpeed));
  }
  if (keys.a) {
    movement.add(cameraRight.clone().multiplyScalar(-moveSpeed));
  }
  if (keys.d) {
    movement.add(cameraRight.clone().multiplyScalar(moveSpeed));
  }

  camera.position.add(movement);
  controls.target.add(movement); 

  // Animate Pokémon
  pokemonList.forEach((poke, i) => {
    const angle = pokemonTime + i;

    const x = Math.cos(angle) * orbitRadius + i * 1.5;  // offset to avoid overlap
    const z = Math.sin(angle) * orbitRadius + i * 1.5;
    const y = Math.sin(pokemonTime + i) * 0.5 + 0.5;  
    poke.position.set(x, y, z);

    poke.lookAt(camera.position);
  });

  renderer.render(scene, camera);
  controls.update();
}

animate();

// === Handle Resize ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
