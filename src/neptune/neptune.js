import * as THREE from 'three';
import neptuneVertexShader from './shaders/vertex.glsl';
import neptuneFragmentShader from './shaders/fragment.glsl';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl';

export default class Neptune {
    constructor(scene, texturePath = '/neptune.jpg') {
        this.scene = scene;
        this.textureLoader = new THREE.TextureLoader();

        // Load Neptune texture
        const neptuneDayTexture = this.textureLoader.load(texturePath);
        neptuneDayTexture.colorSpace = THREE.SRGBColorSpace;
        neptuneDayTexture.anisotropy = 8;

        // Define Neptune's colors
        const nightColor = new THREE.Vector4(0.0, 0.0, 0.0, 0.9);

        // Neptune material and mesh
        const neptuneGeometry = new THREE.SphereGeometry(2, 64, 64);
        const neptuneMaterial = new THREE.ShaderMaterial({
            vertexShader: neptuneVertexShader,
            fragmentShader: neptuneFragmentShader,
            uniforms: {
                uDayTexture: new THREE.Uniform(neptuneDayTexture),
                uNightColor: { value: nightColor },
                uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') },
            },
        });
        this.neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
        this.scene.add(this.neptune);

        // Atmosphere material and mesh
        const atmosphereMaterial = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            transparent: true,
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') },
            },
        });

        const atmosphere = new THREE.Mesh(neptuneGeometry, atmosphereMaterial);
        atmosphere.scale.set(1.04, 1.04, 1.04);
        this.scene.add(atmosphere);

        // Sun direction logic
        this.sunDirection = new THREE.Vector3();
        this.neptuneMaterial = neptuneMaterial;
        this.atmosphereMaterial = atmosphereMaterial;
    }

    updateSunDirection(spherical) {
        // Update sun direction based on spherical coordinates
        this.sunDirection.setFromSpherical(spherical);
        this.neptuneMaterial.uniforms.uSunDirection.value.copy(this.sunDirection);
        this.atmosphereMaterial.uniforms.uSunDirection.value.copy(this.sunDirection);
    }
}