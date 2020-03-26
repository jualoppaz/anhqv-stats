module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],
};
