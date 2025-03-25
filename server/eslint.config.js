import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: { 
            globals: globals.browser 
        }
    },
    pluginJs.configs.recommended,
    {
        rules: {
            /* possible problems */
            "getter-return": "warn",
            "no-setter-return": "warn",
            "no-cond-assign": "warn",
            "no-const-assign": "error",
            "no-constant-condition": "error",
            "no-dupe-args": "error",
            "no-dupe-else-if": "warn",
            "no-duplicate-imports": "warn",
            "no-irregular-whitespace": "warn",
            "no-self-assign": "error",
            "no-self-compare": "error",
            "no-sparse-arrays": "warn",
            "no-undef": "warn",
            "no-unmodified-loop-condition": "error",
            "no-unreachable": "error",
            "no-unreachable-loop": "error",
            "no-unused-vars": "warn",
            "no-use-before-define": ["warn", {
                "functions": false,
                "variables": true
            }],
            "no-useless-assignment": "warn",
            "use-isnan": "warn",
            "valid-typeof": "error",

            /* suggestions */
            "arrow-body-style": ["warn", "as-needed"],
            "block-scoped-var": "error",
            "camelcase": "warn",
            "complexity": "warn",
            "consistent-return": "error",
            "eqeqeq": "warn",
            "default-param-last": "error",
            "default-case-last": "error",
            "max-lines": ["error", {
                "max": 300, 
                "skipBlankLines": true,
                "skipComments": true
            }],
            "max-lines-per-function": ["error", {
                "max": 30, 
                "skipBlankLines": true,
                "skipComments": true
            }],
            "no-empty": ["error", { "allowEmptyCatch": true }],
            "no-empty-function": "error",
            "no-global-assign": "error",
            "no-lone-blocks": "warn",
            "no-lonely-if": "warn",
            "no-magic-numbers": ["warn", {
                "ignore": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }],
            "no-nested-ternary": "warn",
            "no-octal": "warn",
            "no-redeclare": "error",
            "no-unused-expressions": "error",
            "no-useless-catch": "warn",
            "no-useless-escape": "warn",
            "no-useless-return": "warn",
            "no-var": "warn",
            "prefer-arrow-callback": "warn",
            "prefer-const": ["warn", {
                "destructuring": "any",
                "ignoreReadBeforeAssign": false
            }],
            "require-await": "error",
            "yoda": "warn"
        }
    }
];