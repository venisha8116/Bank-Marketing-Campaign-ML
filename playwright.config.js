import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    cwd: './frontend',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});