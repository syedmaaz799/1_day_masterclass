import next from "eslint-config-next";

/**
 * Flat ESLint config (Next 16 ships eslint-config-next as a native flat array).
 */
const eslintConfig = [
  ...next,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];

export default eslintConfig;
