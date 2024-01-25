module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'cypress/globals': true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'eslint:recommended', 'plugin:react/recommended', 'plugin:storybook/recommended'],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'cypress',
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
