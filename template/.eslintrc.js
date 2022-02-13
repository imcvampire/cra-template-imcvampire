module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:prettier/recommended',
    'airbnb/base',
    'airbnb/rules/react',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:editorconfig/all',
  ],
  plugins: ['editorconfig'],
  globals: {
    browser: true,
    document: true,
    fetch: true,
    serviceworker: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    'prettier/prettier': 'error',
  },
}
