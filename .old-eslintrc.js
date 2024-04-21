module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
  extends: ['next/core-web-vitals', 'turbo', 'prettier', 'plugin:tailwindcss/recommended'],
  settings: {
    tailwindcss: {
      callees: ['cn', 'cva'],
      config: 'tailwind.config.cjs',
    },
    next: {
      rootDir: ['apps/*/'],
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: ['@stacks/eslint-config'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': [0],
        '@typescript-eslint/no-unsafe-assignment': [0],
      },

      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    },
  ],
};
