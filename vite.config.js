import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl'; // ESM style import

export default defineConfig({
    plugins: [glsl()],
});