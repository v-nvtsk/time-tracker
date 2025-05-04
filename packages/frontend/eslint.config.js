import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin';
import stylisticJsx from '@stylistic/eslint-plugin-jsx'
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from 'eslint-plugin-import';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import reactPlugin from 'eslint-plugin-react';

export default tseslint.config(
  {
    settings: {
      'import/resolver': {
        typescript: [
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            project: '../packages/*/tsconfig.json',
          }),
        ],
      }
    },
  },
  {
    "settings": {
      "react": {
        "createClass": "createReactClass", // Regex for Component Factory to use,
        // default to "createReactClass"
        "pragma": "React",  // Pragma to use, default to "React"
        "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
        "version": "detect", // React version. "detect" automatically picks the version you have installed.
        // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
        // Defaults to the "defaultVersion" setting and warns if missing, and to "detect" in the future
        "defaultVersion": "19", // Default React version to use when the version you have installed cannot be detected.
        // If not provided, defaults to the latest React version.
        "flowVersion": "0.53" // Flow version
      },
    },
  },
  { ignores: ['dist', 'coverage'] },
  {
    extends: [js.configs.recommended,
    ...tseslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
      '@stylistic/jsx': stylisticJsx,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "simple-import-sort/imports": ["error", { groups: [["^\\u0000", "^node:", "^@?\\w", "^", "^\\."]] }],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-named-as-default": "off",
      "@stylistic/indent": ["error", 2,/*  { "ignoredNodes": ["JSXElement", "JSXElement *"] } */],
      "arrow-spacing": ["error", {
        "before": true,
        "after": true
      }],
      "curly": ["error"],
      "max-lines": [
        "error",
        {
          "max": 200,
          "skipComments": true,
          "skipBlankLines": true,
        },
      ],
      "max-nested-callbacks": [
        "error",
        { "max": 3 },
      ],
      "max-params": [
        "error",
        { "max": 4 },
      ],
      "new-cap": "error",
      "no-alert": ["error"],
      "no-array-constructor": ["error"],
      "no-bitwise": ["error"],
      "no-delete-var": ["error"],
      "no-else-return": ["error"],
      "no-negated-condition": ["error"],
      "no-multi-str": ["error"],
      "no-multi-spaces": ["error"],
      "no-nested-ternary": ["error"],
      "no-param-reassign": ["error"],
      "no-plusplus": ["error"],
      "no-unused-expressions": ["error"],
      "no-restricted-exports": [
        "error",
        {
          "restrictDefaultExports": {
            "direct": true,
            "named": true,
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "no-return-assign": ["error"],
      "no-sequences": ["error"],
      "no-shadow": ["error"],
      "no-useless-escape": ["error"],
      "no-useless-return": ["error"],
      "no-useless-rename": ["error"],
      "no-var": ["error"],
      "no-whitespace-before-property": ["error"],
      "object-shorthand": ["error"],
      "prefer-arrow-callback": ["error"],
      "prefer-const": ["error"],
      "prefer-rest-params": ["error"],
      "prefer-spread": ["error"],
      "prefer-template": ["error"],
      "require-await": ["error"],
      "@stylistic/max-len": ["error", { "code": 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
      'computed-property-spacing': ["error", "never"],
      "no-whitespace-before-property": "error",
      "no-console": ["error", { "allow": ["warn", "error"] }],
      "space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/arrow-spacing": "error",
      "@stylistic/object-curly-newline": ["error", { "minProperties": 2 }],
      "@stylistic/object-property-newline": "error",
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/object-curly-spacing": ["error", "never"],
      "@stylistic/space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always",

      }],
      "@stylistic/semi": "error",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/semi-spacing": ["error", {
        "before": false,
        "after": true
      }],
      "@stylistic/key-spacing": ["error", {
        "beforeColon": false,
        "afterColon": true,
        mode: "strict"
      }],
      "@stylistic/no-trailing-spaces": ["error", {
        "skipBlankLines": true,
        "ignoreComments": true
      }],
      "@stylistic/no-multi-spaces": ["error", { ignoreEOLComments: true }],
      "@stylistic/newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
      "@stylistic/lines-between-class-members": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 0,

      }],
      "@stylistic/comma-spacing": ["error", {
        "before": false,
        "after": true
      }],
      "@stylistic/padding-line-between-statements": [
        "error",
        {
          blankLine: "never",
          prev: "*",
          next: "*"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "function"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "return"
        },

        //
        {
          blankLine: "always",
          prev: "*",
          next: ["const", "let", "var"]
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*"
        },
        {
          blankLine: "never",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"]
        },
        //
        {
          blankLine: "always",
          prev: "import",
          next: "*"
        },
        {
          blankLine: "never",
          prev: "import",
          next: "import"
        },
        //
        {
          blankLine: "always",
          prev: "*",
          next: "export"
        },
        {
          blankLine: "any",
          prev: "export",
          next: "export"
        },

      ],
      // '@stylistic/jsx-closing-bracket-location': ['error', { selfClosing: 'after-props', nonEmpty: 'after-props', }],
      // "@stylistic/jsx/jsx-indent-props": ['error', 2],
      // "@stylistic/jsx/jsx-curly-spacing": ["error", { "when": "never", "children": true, attributes: true, "allowMultiline": false }],
      // "@stylistic/jsx/jsx-props-no-multi-spaces": "error",
      // "@stylistic/jsx/jsx-tag-spacing": ["error", {
      //   "closingSlash": "never",
      //   "beforeSelfClosing": "always",
      //   "afterOpening": "never",
      //   "beforeClosing": "never"
      // }],
      // "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      // "@stylistic/jsx/jsx-curly-newline": ["error", {
      //   multiline: "consistent",
      //   singleline: "consistent"
      // }],
      // "@stylistic/jsx/jsx-newline": ["error", {
      //   prevent: true, "allowMultilines": true
      // }]
    },
  },

)
