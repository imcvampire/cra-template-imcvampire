const fs = require('fs')

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const isCI = process.env.CI === 'true'
const isDev = !isCI && process.env.NODE_ENV === 'development'
const severity = isDev ? 'warn' : 'error'

module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb/base',
    'airbnb/rules/react',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:editorconfig/all',
    'prettier',
  ],
  plugins: [
    'editorconfig',
    'immer',
    'simple-import-sort',
    'import',
    'prettier',
  ],
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
    curly: ['error', 'multi-line'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['^draft', 'state'],
      },
    ],

    'react/jsx-wrap-multilines': [
      'error',
      {
        prop: 'ignore',
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/state-in-constructor': ['error', 'never'],

    'prettier/prettier': severity,

    'immer/no-update-map': 'error',

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
  overrides: [
    {
      files: ['**/*.js?(x)'],
      rules: {
        'simple-import-sort/imports': [
          severity,
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Packages. `react` related packages come first.
              // Things that start with a letter (or digit or underscore), or `@` followed by a
              // letter.
              ['^react', '^@?\\w'],
              // Absolute imports and Relative imports.
              [`^(${folders.join('|')})(/.*|$)`, '^\\.'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ],
}
