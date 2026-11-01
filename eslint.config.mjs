import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  sonarjs.configs.recommended,
  {
    rules: {
      "max-lines": ["error", { max: 500, skipBlankLines: true, skipComments: true }],
      "eol-last": ["error", "always"],
      "prefer-arrow-callback": "error",
      "func-style": ["error", "expression"],
      camelcase: ["error", { properties: "never" }],
      "no-nested-ternary": "error",
      "sonarjs/no-duplicate-string": ["error", { threshold: 4 }],
      "sonarjs/pseudo-random": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
