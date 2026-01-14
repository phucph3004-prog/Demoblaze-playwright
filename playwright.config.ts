import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://www.demoblaze.com/';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 7_000 },

  retries: process.env.CI ? 1 : 0,
  fullyParallel: true,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /tests\/setup\/.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    //Regression suite auth
    {
      name: 'regression',
      dependencies: ['setup'],
      testMatch: /tests\/regression\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] ,storageState: 'storage/.auth/user.json' }
    },
    // Test suites with authentication
    {
      name: 'ui-auth-chromium',
      dependencies: ['setup'],
      testMatch: /tests\/ui\/(?!auth\/).*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], storageState: 'storage/.auth/user.json' },
    },
    // Test suites without authentication
    {
      name: 'ui-noauth-chromium',
      testMatch: /tests\/ui\/auth\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },

    // API & other groupings
    { name: 'api', testMatch: /tests\/api\/.*\.spec\.ts/, use: { ...devices['Desktop Chrome'],storageState: 'storage/.auth/user.json' } },
  ],
});
