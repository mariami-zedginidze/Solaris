import * as THREE from 'three';

export default class Neptune {
    constructor(textureLoader) {
        // Neptune Texture
        const neptuneDayTexture = textureLoader.load('/textures/neptune/neptune.jpg');
        neptuneDayTexture.colorSpace = THREE.SRGBColorSpace;
        neptuneDayTexture.anisotropy = 8;

        // Colors
        const nightColor = new THREE.Vector4(0.0, 0.0, 0.0, 0.9);

        // Neptune Mesh
        const neptuneGeometry = new THREE.SphereGeometry(2, 64, 64);
        this.material = new THREE.ShaderMaterial({
            vertexShader: neptuneVertexShader,
            fragmentShader: neptuneFragmentShader,
            uniforms: {
                uDayTexture: new THREE.Uniform(neptuneDayTexture),
                uNightColor: { value: nightColor },
                uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') }
            }
        });

        this.mesh = new THREE.Mesh(neptuneGeometry, this.material);

        // Atmosphere
        this.atmosphereMaterial = new THREE.ShaderMaterial({
            side: THREE.BackSide,
            transparent: true,
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            uniforms: {
                uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
                uAtmosphereDayColor: { value: new THREE.Color('#3a0ca3') },
                uAtmosphereTwilightColor: { value: new THREE.Color('#7209b7') }
            }
        });

        const atmosphere = new THREE.Mesh(neptuneGeometry, this.atmosphereMaterial);
        atmosphere.scale.set(1.04, 1.04, 1.04);

        // Group Neptune and its Atmosphere
        this.group = new THREE.Group();
        this.group.add(this.mesh);
        this.group.add(atmosphere);
    }

    updateSunDirection(sunDirection) {
        this.material.uniforms.uSunDirection.value.copy(sunDirection);
        this.atmosphereMaterial.uniforms.uSunDirection.value.copy(sunDirection);
    }
}