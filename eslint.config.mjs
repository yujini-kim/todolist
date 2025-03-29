import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import { configs as tsConfigs } from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: {
      '@typescript-eslint': tsConfigs,
      react: pluginReact.configs.recommended,
    },
  },
]);
