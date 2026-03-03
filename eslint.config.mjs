import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  ignores: [
    "node_modules/**",
    ".next/**",
    ".vercel/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "sentry.*.config.ts",
    "loaders/**",
  ],
}, {
  rules: {
    // Allow require imports for dynamic requires
    "@typescript-eslint/no-require-imports": "off",
    // Allow setState in effects - common pattern for route changes, URL params, etc.
    "react-hooks/set-state-in-effect": "off",
    // Not worth blocking the agent over
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unescaped-entities": "off",
    "@next/next/no-html-link-for-pages": "off",
    
    // Type safety: prevent unsafe type assertions
    "@typescript-eslint/consistent-type-assertions": ["error", {
      assertionStyle: "as",
      objectLiteralTypeAssertions: "never",  // Ban `{} as Type` - forces proper typing
    }],
    "@typescript-eslint/no-non-null-assertion": "error",  // Ban `!` operator
  },
}];

export default eslintConfig;
