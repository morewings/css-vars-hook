import {kitchen} from 'alias-kitchen';

export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        ...kitchen({recipe: 'jest'}),
        '\\.(gif|ttf|eot|svg|png|jpg)$': 'identity-obj-proxy',
        '\\.css$': 'identity-obj-proxy',
    },
    modulePathIgnorePatterns: ['<rootDir>/templates/'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    coverageReporters: [
        [
            'lcov',
            {
                projectRoot: '.',
            },
        ],
    ],
    collectCoverageFrom: [
        'src/lib/**/*.ts',
        'src/lib/**/*.tsx',
        '!src/lib/**/index.ts',
        '!**/node_modules/**',
    ],
};
