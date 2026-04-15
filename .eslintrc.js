module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: ['@babel/plugin-syntax-jsx'],
      presets: ['@babel/preset-react'],
    },
  },
  environment: {
    browser: true,
    es6: true,
    node: true,
  },
};
