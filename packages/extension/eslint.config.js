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

export default tseslint.config(
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.json',
          tsconfigRootDir: import.meta.dirname
        }),
      ],
      'import/resolver': {
        typescript: [
          createTypeScriptImportResolver({
            alwaysTryTypes: true,
            project: './tsconfig.json',
            tsconfigRootDir: import.meta.dirname
          }),
        ],
      }
    },
  },
  { ignores: ['dist', 'coverage'] },
  {
    extends: [js.configs.recommended,
    ...tseslint.configs.recommended,
    importPlugin.flatConfigs.recommended,
    importPlugin.flatConfigs.typescript,
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
      'import-x': importPlugin,
    },
    rules: {
      'import-x/no-unresolved': 'error',
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
      "@stylistic/indent": ["error", 2],
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
      "new-cap": ["error"],
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
      "no-undefined": ["error"],
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
          blankLine: "never",
          prev: "export",
          next: "export"
        },

      ],
      "@stylistic/jsx/jsx-indent": ["error", 2, { checkAttributes: true }],
      '@stylistic/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      "@stylistic/jsx/jsx-indent-props": ['error', 2],
      "@stylistic/jsx/jsx-curly-spacing": ["error", { "when": "never", "children": true, attributes: true, "allowMultiline": false }],
      "@stylistic/jsx/jsx-props-no-multi-spaces": "error",
      "@stylistic/jsx/jsx-tag-spacing": ["error", {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "never"
      }],
      "@stylistic/jsx/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      "@stylistic/jsx/jsx-curly-newline": ["error", {
        multiline: "consistent",
        singleline: "consistent"
      }],
      "@stylistic/jsx/jsx-newline": ["error", {
        prevent: true, "allowMultilines": true
      }]
    },
  },

)