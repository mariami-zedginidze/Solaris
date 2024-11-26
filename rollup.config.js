import glsl from 'rollup-plugin-glsl';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/solaris.min.js',
        format: 'umd',
        name: 'Solaria',  // or another name for your global variable
    },
    plugins: [
        resolve({
            extensions: ['.js', '.mjs', '.json', '.glsl'] // Ensure GLSL files are resolved
        }),
        commonjs(),
        glsl()  // This plugin handles GLSL files
    ],
};