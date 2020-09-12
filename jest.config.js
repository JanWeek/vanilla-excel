module.exports = {
  moduleFileExtensions: ['js', 'scss'],
  transform: {
    '^.+\\.(js)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1'
  }
};
