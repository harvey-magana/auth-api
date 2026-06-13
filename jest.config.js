module.exports = async () => {
  return {
      coverageProvider: 'v8',
      testEnvironment: 'node',
      testMatch: ["**/**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      moduleDirectories: ['node_modules'],
      collectCoverage: true,
      clearMocks: true,
      verbose: true,
      forceExit: true,
      bail: 1
  }
};