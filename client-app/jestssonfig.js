/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(specs|tests).[jt]s?(x)",
  ],
};

module.exports = config;
