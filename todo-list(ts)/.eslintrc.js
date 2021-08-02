module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "linebreak-style": 0,
    "import/extensions": 0,
    "react/jsx-filename-extension": 0,
    "no-unused-vars": 1,
    "prettier/prettier": [
      "error",
      {
        semi: true,
        useTabs: false,
        tabWidth: 2,
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: "avoid",
        endOfLine: "auto",
      },
    ],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};
