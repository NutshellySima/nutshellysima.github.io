import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist/**', '.astro/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        lucide: 'readonly',
      },
    },
  },
  {
    files: ['sw.js'],
    languageOptions: {
      globals: {
        self: 'readonly',
        caches: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        Response: 'readonly',
        clients: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['cloudflare/**/*.js'],
    languageOptions: {
      globals: {
        URL: 'readonly',
        Response: 'readonly',
        Headers: 'readonly',
        TextEncoder: 'readonly',
        Uint8Array: 'readonly',
        crypto: 'readonly',
        fetch: 'readonly',
      },
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none', argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['**/*.astro/*.ts', '**/*.astro/*.js'],
    rules: {
      'no-var': 'off',
      'prefer-rest-params': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none', argsIgnorePattern: '^_' }],
    },
  },
);
