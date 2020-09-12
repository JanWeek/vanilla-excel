module.exports = {
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.(js)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1'
  }
};
