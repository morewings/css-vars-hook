import {resolve} from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import hq from 'alias-hq';
import external from '@yelo/rollup-node-external';
import dts from 'vite-plugin-dts';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
    resolve: {
        alias: hq.get('rollup'),
    },
    plugins: [react(), dts({rollupTypes: true})],
    build: {
        sourcemap: true,
        lib: {
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'css-vars-hook',
            fileName: 'index',
        },
        rollupOptions: {
            external: external(),
            output: {
                globals: {
                    react: 'React',
                },
                banner: "'use client';",
            },
        },
    },
    css: {
        postcss: {
            plugins: [postcssPresetEnv({stage: 1})],
        },
    },
});
