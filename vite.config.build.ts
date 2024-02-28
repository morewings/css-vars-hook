import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error no types
import hq from 'alias-hq';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: hq.get('rollup'),
    },
    plugins: [react()],
    base: '/css-vars-hook/',
    css: {
        postcss: {
            plugins: [postcssPresetEnv({})],
        },
    },
});
