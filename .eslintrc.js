module.exports = {
  env: {
    es6: true,
    node: true,
  },
  "indent": ["error", "tab"],
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
  rules: {
    'linebreak-style': 0
  },
};
