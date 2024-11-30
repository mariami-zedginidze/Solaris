import ThreeDScene from './scene';

// Set up options for the scene (sphere size, rotation speed, etc.)
const options = {
    sphereSize: 2,  // Bigger sphere
    rotationSpeed: 0.02,  // Faster rotation
    cameraPosition: { z: 5 },  // Move the camera back a bit
};

// Find the element on the webpage where the canvas will go
const container = document.getElementById('canvas-container');

// Create and start the 3D scene with the container and options
const scene = new ThreeDScene(container, options);
scene.start();  // Start the animation