module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-config-css-modules'],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'no-descending-specificity': null,
    'function-url-quotes': 'always',
    'selector-attribute-quotes': 'always',
    'font-family-no-missing-generic-family-keyword': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'selector-type-no-unknown': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*(-[a-z0-9]+)*|[a-z][a-zA-Z0-9]+)$',
      {
        message: 'Expected class selector to be kebab-case or lowerCamelCase',
      },
    ],
    'keyframes-name-pattern': null,
    'string-quotes': 'single',
    'alpha-value-notation': 'number',
    'unit-no-unknown': [true, { ignoreUnits: ['dx'] }],
    'color-function-notation': 'legacy',
    'scss/at-import-partial-extension': 'always',
    'scss/function-no-unknown': [
      true,
      {
        ignoreFunctions: ['dx2vh'],
      },
    ],
  },
}
