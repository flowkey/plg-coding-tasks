module.exports = {
    preset: "ts-jest",
    testEnvironment: "node", // Runs tests in a Node.js environment
    clearMocks: true,
    moduleFileExtensions: ["ts", "js"],
    coverageDirectory: "coverage",
    testMatch: ["**/src/**/*.test.ts"],
};
