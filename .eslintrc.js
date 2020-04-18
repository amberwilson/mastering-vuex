module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/airbnb'],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

};
