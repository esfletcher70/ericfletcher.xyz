import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      // shadcn/ui vendored primitives — not authored here
      "components/ui/**",
    ],
  },
  {
    rules: {
      // The derived-filtered-list and mounted-guard patterns are intentional here.
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  globalIgnores([".next/**", ".open-next/**", "node_modules/**", "out/**", "build/**"]),
]);

export default eslintConfig;
