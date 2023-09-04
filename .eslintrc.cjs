module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'types'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'semi': ['off', 'never'],
    'no-unused-vars': 'error',
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreStrings': true,
        'ignoreUrls': true,
        'ignoreRegExpLiterals': true,
        'ignoreTemplateLiterals': true
      }
    ],
    'prettier/prettier': 'error'
  },
}
