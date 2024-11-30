uniform float time;

void main() {
    float r = 0.5 + 0.5 * sin(time);
    float g = 0.5 + 0.5 * sin(time + 1.0);
    float b = 0.5 + 0.5 * sin(time + 2.0);
    
    gl_FragColor = vec4(r, g, b, 1.0);
}