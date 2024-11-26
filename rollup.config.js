import { terser } from 'rollup-plugin-terser';  // For minifying the output
import resolve from '@rollup/plugin-node-resolve';  // To resolve node modules
import commonjs from '@rollup/plugin-commonjs';  // To handle commonjs modules

export default {
    input: 'src/index.js',  // Entry point of your library
    output: {
        file: 'dist/solaris.min.js',  // Output file name
        format: 'umd',  // Universal Module Definition (works in both browser and Node.js)
        name: 'Solaris',  // Global variable name when included in a script tag
        globals: {
            'three': 'THREE',  // For external dependencies like Three.js
        }
    },
    plugins: [
        resolve(),  // Resolve external dependencies
        commonjs(),  // Convert CommonJS modules to ES6
        terser(),  // Minify the output
    ]
};