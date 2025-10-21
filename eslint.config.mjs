import js from "@eslint/js";
import globals from "globals";
import ts from "typescript-eslint";
import eslint_plugin_react_hooks from "eslint-plugin-react-hooks";

export default [
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...ts.configs.recommended,
  { ignores: ["dist/"] },
  {
    rules: {
      // 添加混合导入检测规则
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      // 其他常用TypeScript校验规则
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/prefer-as-const": "error",
    },
  },
  {
    plugins: { "react-hooks": eslint_plugin_react_hooks },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
