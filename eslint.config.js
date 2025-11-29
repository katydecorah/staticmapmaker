const js = require('@eslint/js');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const reactPerf = require('eslint-plugin-react-perf');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'writable',
        process: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react-perf': reactPerf,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...reactPerf.configs.recommended.rules,
      'prefer-template': 'error',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': 'error',

      // Fix later
      'react/no-unescaped-entities': 'off',
      'react-perf/jsx-no-new-function-as-prop': 'off',

      // Not compatible with static build
      '@next/next/no-img-element': 'off',

      // Disable some rules that conflict with TypeScript
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      '.git/**',
      '*.config.js',
      'jest.config.js',
      'next.config.js',
      'next-sitemap.config.js',
    ],
  },
];
