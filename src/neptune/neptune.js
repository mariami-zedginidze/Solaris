// Import necessary Three.js components
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Import shaders
import neptuneVertexShader from './shaders/vertex.glsl';
import neptuneFragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

// Neptune effect class
class Neptune {
    constructor() {
        // Set up the canvas and scene
        this.canvas = document.querySelector('canvas.webgl');
        this.scene = new THREE.Scene();
        this.textureLoader = new THREE.TextureLoader();

        // Set up the camera
        this.sizes = { width: window.innerWidth, height: window.innerHeight, pixelRatio: Math.min(window.devicePixelRatio, 2) };
        this.camera = new THREE.PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.1, 100);
        this.camera.position.set(12, -2, -4);
        this.scene.add(this.camera);

        // Set up the renderer
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.setClearColor('#000011');

        // Set up the controls (optional)
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;

        // Resize listener
        window.addEventListener('resize', this.resize.bind(this));

        // Initialize the effect
        this.init();
    }

    init() {
        // Load Neptune textures
        const neptuneDayTexture = this.textureLoader.load('./neptune/neptune.jpg');
        neptuneDayTexture.colorSpace = THREE.SRGBColorSpace;
        neptuneDayTexture.anisotropy = 8;

        // Create Neptune geometry and material
        const neptuneGeometry = new THREE.SphereGeometry(2, 64, 64);
        const neptuneMaterial = new THREE.ShaderMaterial({
            vertexShader: neptuneVertexShader,
            fragmentShader: neptuneFragmentShader,
            uniforms: {
                uDayTexture: new THREE.Uniform(neptuneDayTexture),
                uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') },
            }
        });

        const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        this.scene.add(neptune);

        // Add atmosphere mesh
        const atmosphereMaterial = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            transparent: true,
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') }
            }
        });

        const atmosphere = new THREE.Mesh(neptuneGeometry, atmosphereMaterial);
        atmosphere.scale.set(1.04, 1.04, 1.04);
        this.scene.add(atmosphere);
    }

    resize() {
        // Update size on window resize
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    animate() {
        // Animation loop
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Update controls
            this.controls.update();

            // Render the scene
            this.renderer.render(this.scene, this.camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };
        tick();
    }
}

export default Neptune;