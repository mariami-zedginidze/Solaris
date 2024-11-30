import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

class ThreeDScene {
    constructor(container, options = {}) {
        this.options = {
            sphereSize: 1,   // Sphere size
            rotationSpeed: 0.01,   // Rotation speed
            cameraPosition: { z: 5 },  // Camera position
            ...options
        };

        // Create scene and camera
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Create renderer and attach canvas to container
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if (container) {
            container.appendChild(this.renderer.domElement);
        }

        // Shader material
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                color: { value: new THREE.Color(0x00ff00) }  // Green color
            }
        });

        // Create sphere with shader material
        const geometry = new THREE.SphereGeometry(this.options.sphereSize, 32, 32);
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);

        // Position the camera
        this.camera.position.z = this.options.cameraPosition.z;

        // Resize handling
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    // Handle window resizing
    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // Start the animation loop
    start() {
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the sphere
            this.sphere.rotation.x += this.options.rotationSpeed;
            this.sphere.rotation.y += this.options.rotationSpeed;

            // Render the scene
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }
}

export default ThreeDScene;