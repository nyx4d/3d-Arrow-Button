// Required CDNs:
// - Three.js: https://cdn.jsdelivr.net/npm/three@0.152.0/build/three.min.js
// - OrbitControls: https://cdn.jsdelivr.net/npm/three@0.152.0/examples/js/controls/OrbitControls.js

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls (for testing interaction)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7).normalize();
scene.add(directionalLight);

// Button Group
const buttonGroup = new THREE.Group();
scene.add(buttonGroup);

// Button Base
const baseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 64);
const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x2d2d2d,
    metalness: 0.5,
    roughness: 0.5,
    emissive: 0x111111,
});
const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
buttonGroup.add(baseMesh);

// Button Rim (outer glow effect)
const rimGeometry = new THREE.TorusGeometry(1.55, 0.18, 32, 64);
const rimMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    emissive: 0xff8000,
    emissiveIntensity: 0.4,
    metalness: 0.7,
    roughness: 0.2,
});
const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
rimMesh.rotation.x = Math.PI / 2;
rimMesh .position.set(0.0, -0.1, 0.0);
buttonGroup.add(rimMesh);

// Arrow Group
const arrowGroup = new THREE.Group();
buttonGroup.add(arrowGroup);

// Arrow Body
const arrowBodyGeometry = new THREE.BoxGeometry(0.5, 0.7, 0.3);
const arrowBodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x888888,
});

const arrowBody = new THREE.Mesh(arrowBodyGeometry, arrowBodyMaterial);
arrowBody.rotation.x = Math.PI / 2;
arrowBody.position.set(0.0, 0.3, -0.29);
arrowGroup.add(arrowBody);

// Arrow Head
const arrowHeadGeometry = new THREE.ConeGeometry(0.5, 0.85, 32);
const arrowHeadMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0x888888,
});
const arrowHead = new THREE.Mesh(arrowHeadGeometry, arrowHeadMaterial);
arrowHead.rotation.x = Math.PI / 2;
arrowHead.position.set(0, 0.30, 0.39); // Adjusted to align with arrow body
arrowGroup.add(arrowHead);

// Camera Position
camera.position.set(-1, 10, 0);
controls.update();

// Button Interaction Variables
let isPressing = false;
let pressProgress = 0; // Animation progress for button press (0 to 1)
const pressSpeed = 0.1;

// Event Listeners for Interaction
window.addEventListener("mousedown", () => {
    isPressing = true;
});
window.addEventListener("mouseup", () => {
    isPressing = false;
});

// Animate Function
const animate = () => {
    requestAnimationFrame(animate);

    // Button Press Animation
    if (isPressing && pressProgress < 1) {
        pressProgress += pressSpeed;
    } else if (!isPressing && pressProgress > 0) {
        pressProgress -= pressSpeed;
    }

    // Update Button and Arrow Positions
    const pressedPosition = -0.21; // Depth the button presses down
    const arrowOffset = -0.05; // Arrow moves with the button

    baseMesh.position.y = pressProgress * pressedPosition;
    arrowGroup.position.y = pressProgress * (pressedPosition + arrowOffset);

    renderer.render(scene, camera);
};
animate(); 
