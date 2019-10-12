module.exports = {
    parser: 'babel-eslint',
    env: {
        "browser": true,
        "node": true,
        "jest": true,
        "es6": true
    },
    parserOptions: {
        "ecmaVersion": 2017,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            createClass: 'createReactClass',
            pragma: 'React',
            version: 'detect',
        },
    },
    rules: {
        indent: 'off',
        semi: [2, "always"],
        'no-console': 'off',
        'comma-dangle': 'off',
        'react/jsx-filename-extension': 'off',
        'max-len': [
            'error',
            {
                code: 200,
            },
        ],
        'prefer-promise-reject-errors': ['off'],
        'no-return-assign': ['off'],
        "no-shadow": 2,                  // http://eslint.org/docs/rules/no-shadow
        "no-shadow-restricted-names": 2, // http://eslint.org/docs/rules/no-shadow-restricted-names
        "no-unused-vars": [2, {          // http://eslint.org/docs/rules/no-unused-vars
            "vars": "local",
            "args": "after-used"
        }],
        "no-use-before-define": 2,       // http://eslint.org/docs/rules/no-use-before-define,
        /**
         * Possible errors
         */
        "comma-dangle": [2, "never"],    // http://eslint.org/docs/rules/comma-dangle
        "no-cond-assign": [2, "except-parens"], // http://eslint.org/docs/rules/no-cond-assign
        "no-console": "off",                 // http://eslint.org/docs/rules/no-console
        "no-debugger": 1,                // http://eslint.org/docs/rules/no-debugger
        "no-alert": 1,                   // http://eslint.org/docs/rules/no-alert
        "no-constant-condition": 1,      // http://eslint.org/docs/rules/no-constant-condition
        "no-dupe-keys": 2,               // http://eslint.org/docs/rules/no-dupe-keys
        "no-duplicate-case": 2,          // http://eslint.org/docs/rules/no-duplicate-case
        "no-empty": 2,                   // http://eslint.org/docs/rules/no-empty
        "no-ex-assign": 2,               // http://eslint.org/docs/rules/no-ex-assign
        "no-extra-boolean-cast": 0,      // http://eslint.org/docs/rules/no-extra-boolean-cast
        "no-extra-semi": 2,              // http://eslint.org/docs/rules/no-extra-semi
        "no-func-assign": 2,             // http://eslint.org/docs/rules/no-func-assign
        "no-inner-declarations": 2,      // http://eslint.org/docs/rules/no-inner-declarations
        "no-invalid-regexp": 2,          // http://eslint.org/docs/rules/no-invalid-regexp
        "no-irregular-whitespace": 2,    // http://eslint.org/docs/rules/no-irregular-whitespace
        "no-obj-calls": 2,               // http://eslint.org/docs/rules/no-obj-calls
        "no-sparse-arrays": 2,           // http://eslint.org/docs/rules/no-sparse-arrays
        "no-unreachable": 2,             // http://eslint.org/docs/rules/no-unreachable
        "use-isnan": 2,                  // http://eslint.org/docs/rules/use-isnan
        "block-scoped-var": 2,           // http://eslint.org/docs/rules/block-scoped-var
    },
};