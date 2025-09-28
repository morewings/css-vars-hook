import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {kitchen} from 'alias-kitchen';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: kitchen({recipe: 'vite'}),
    },
    plugins: [react()],
    base: '/css-vars-hook/',
    css: {
        postcss: {
            plugins: [postcssPresetEnv({})],
        },
    },
});
