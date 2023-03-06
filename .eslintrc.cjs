module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'react-app',
    'react-app/jest',
    'plugin:ssr-friendly/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'ssr-friendly'],
  rules: {
    /**
     * Allow empty arrow functions `() => {}`, while keeping other empty functions restricted
     * @see https://eslint.org/docs/latest/rules/no-empty-function#allow-arrowfunctions
     */
    '@typescript-eslint/no-empty-function': ['error', {allow: ['arrowFunctions']}],
    '@typescript-eslint/ban-ts-comment': 1,
    'no-const-assign': 'error',
    /** Restrict imports from devDependencies since they are not included in library build. peerDependencies are ok */
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        peerDependencies: true,
      },
    ],
    /**
     * Enforce import order with empty lines between import group
     * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
     * @see https://git.naspersclassifieds.com/olxeu/pwa/shared/olx-ui-library/-/wikis/Imports-order-and-rules
     */
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'lib/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
      },
    ],
    /**
     * Disallow combined module and type imports like this `import React, {FC} from 'react'`.
     * Eslint will try to split into type and module imports instead
     * @see https://typescript-eslint.io/rules/consistent-type-imports/
     * @see https://git.naspersclassifieds.com/olxeu/pwa/shared/olx-ui-library/-/wikis/Imports-order-and-rules
     */
    '@typescript-eslint/consistent-type-imports': 'error',
    'import/no-cycle': 'error',
  },
  overrides: [
    {
      /* Allow devDependencies imports for tests and config files */
      files: ['**/*.test.*', '**/testUtils/*.*', 'rollup.*.js'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            peerDependencies: true,
          },
        ],
      },
    }
  ],
};
