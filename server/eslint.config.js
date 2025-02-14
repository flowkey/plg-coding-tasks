import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
    js.configs.recommended,
    {
        ignores: [],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": ts,
            prettier: prettier,
        },
        rules: {
            "prettier/prettier": "error",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": "error",
        },
    },
];
