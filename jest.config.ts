import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir/src/modules/**/useCases/**/*.ts>'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\dist\\\\'],
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/*.spec.ts'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\dist\\\\'],
};
