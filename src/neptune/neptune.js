import * as THREE from 'three';

// Import shaders
import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';

export default class Neptune {
    constructor(scene) {
        this.scene = scene;

        // Create material
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                uTexture: { value: null }, // Replace with your Neptune texture
            },
        });

        // Create geometry
        const geometry = new THREE.SphereGeometry(1, 64, 64);

        // Create mesh
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    update(deltaTime) {
        this.mesh.material.uniforms.uTime.value += deltaTime;
    }
}