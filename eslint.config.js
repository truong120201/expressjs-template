import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(),
  {
    plugins: {},

    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: false,
          legacyDecorators: false,
          classProperties: true,
        },
      },
    },

    rules: {
      'no-console': 'warn',
      'func-names': 'off',
      'no-underscore-dangle': 'off',
      'consistent-return': 'off',
      'jest/expect-expect': 'off',
      'security/detect-object-injection': 'off',
    },
  },
];
