module.exports = {
  extends: 'airbnb-base',

  env: {
    node: true
  },

  rules: {
    'comma-dangle': ['error', 'never'],
    'vars-on-top': 0,
    'func-names': ['error', 'as-needed'],

    // disable es6
    'no-var': 0,
    'object-shorthand': 0,
    'prefer-arrow-callback': 0,
    'prefer-template': 0,
    'prefer-spread': 0,
    'prefer-rest-params': 0
  }
};
