/* eslint-disable import/no-extraneous-dependencies,@typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import typescript from '@rollup/plugin-typescript';
// TODO: delete these plugins if 0.6.3 version works
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import replace from '@rollup/plugin-replace';
import external from '@yelo/rollup-node-external';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: './src/lib/index.ts',
        output: [
            {
                format: 'cjs',
                // dir: './lib',
                exports: 'named',
                sourcemap: true,
                file: './dist/index.cjs.js',
            },
            {
                format: 'esm',
                // dir: './lib',
                exports: 'named',
                sourcemap: true,
                file: './dist/index.esm.js',
            },
        ],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        external: external(),
        plugins: [
            typescript({
                tsconfig: 'tsconfig.build.json',
            }),
        ],
    }
];
