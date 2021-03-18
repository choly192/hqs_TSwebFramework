module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "react", "typescript"],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    environment: "readonly",
    publicPath: "readonly", // 配置多级目录访问地址
    jwtToken: "readonly",
    httpUrl: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'moudle'
  },
  settings: {
    "import/resolver": { // 处理webpack中指定别名 但是eslint未识别到 eslint-import-resolver-webpack
      webpack: {
        config: "./webpackConfig/webpack.base.js"
      }
    },
    react: {
      version: '^17.0.1'
    }
  },
  rules: {
    semi: [2, "always"],
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/explicit-module-boundary-types": 2,
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowTypedFunctionExpressions": true
    }],
    "@typescript-eslint/no-explicit-any": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "react/no-string-refs": "off",
    "no-debugger": "off",
    "react/prop-types": "off",
    "prefer-const": 2,
    "no-unused-vars": "warn", // 将未使用的变量改为警告
    "no-useless-constructor": "off"
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    // 'prettier/babel',
    // 'prettier/react',
    // 'prettier/standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ]
}