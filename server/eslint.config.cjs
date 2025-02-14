const js = require("@eslint/js");
const ts = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettier = require("eslint-plugin-prettier");

module.exports = [
    {
        ignores: ["build", "node_modules"],
        files: ["src/**/*.*"],
    },
    js.configs.recommended,
    {
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                console: "readonly",
                require: "readonly",
                module: "readonly",
                __dirname: "readonly",
                process: "readonly",
                describe: "readonly",
                test: "readonly",
                expect: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": ts,
            prettier: prettier,
        },
        rules: {},
    },
];
