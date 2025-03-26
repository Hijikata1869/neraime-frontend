/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  globals: {
    'ts-jest': {
      tsconfig: "<rootDir>/tsconfig.test.json"
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

module.exports = config;
