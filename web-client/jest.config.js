/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"], // ✅ Use a local setup file
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
