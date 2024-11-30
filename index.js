import ThreeDScene from './scene';

// Simple options to control the sphere and camera
const options = {
    sphereSize: 2,  // Larger sphere
    rotationSpeed: 0.02,  // Faster rotation
    cameraPosition: { z: 5 },  // Move camera a bit further back
};

// Get the container for the canvas
const container = document.getElementById('canvas-container');

// Instantiate and start the 3D scene
const scene = new ThreeDScene(container, options);
scene.start();