import * as THREE from 'three';
import neptuneVertexShader from './vertex.glsl';
import neptuneFragmentShader from './fragment.glsl';
const neptuneDayTexture = textureLoader.load('/textures/neptune/neptune.jpg');

export default class Neptune {
    constructor(scene, textureLoader) {
        this.scene = scene;

        // Load Neptune texture
        this.neptuneDayTexture = textureLoader.load('./neptune/neptune.jpg');
        this.neptuneDayTexture.colorSpace = THREE.SRGBColorSpace;
        this.neptuneDayTexture.anisotropy = 8;

        // Create Neptune material
        this.neptuneMaterial = new THREE.ShaderMaterial({
            vertexShader: neptuneVertexShader,
            fragmentShader: neptuneFragmentShader,
            uniforms: {
                uDayTexture: { value: this.neptuneDayTexture },
                uNightColor: { value: new THREE.Vector4(0.0, 0.0, 0.0, 0.9) },
                uSunDirection: { value: new THREE.Vector3(0, 0, 1) },
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') },
            },
        });

        // Create Neptune geometry and mesh
        const neptuneGeometry = new THREE.SphereGeometry(2, 64, 64);
        this.neptuneMesh = new THREE.Mesh(neptuneGeometry, this.neptuneMaterial);
        this.scene.add(this.neptuneMesh);
    }

    updateSunDirection(sunDirection) {
        this.neptuneMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    }
}