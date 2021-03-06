module.exports = {
   'env': {
      'commonjs': true,
      'es2021': true,
      'node': true
   },
   'extends': [
      'eslint:recommended',
      'plugin:node/recommended',
   ],
   'parserOptions': {
      'ecmaVersion': 12
   },
   'ignorePatterns': ['/src/data.js', '/static'],
   'rules': {
      'indent': ['error', 3, { 'SwitchCase': 1 }],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['warn', 'single'],
      'semi': ['error', 'never']
   }
}
