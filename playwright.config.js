import fs from "fs";
import path from "path";
import { defineConfig } from '@playwright/test';

// Derive the API base URL from the frontend's Vite env so the integration
// tests always talk to the same backend the UI is configured to use.
let apiBaseUrl = 'http://localhost:8000';
const envPath = path.resolve('frontend', '.env');

if (fs.existsSync(envPath)) {
  const match = fs
    .readFileSync(envPath, 'utf8')
    .match(/^VITE_API_BASE_URL\s*=\s*(.+)$/m);

  if (match) {
    apiBaseUrl = match[1].trim();
  }
}

const apiPort = new URL(apiBaseUrl).port || '8000';

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  webServer: [
    {
      command: 'npm run dev -- --host 127.0.0.1',
      cwd: './frontend',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
    },
    {
      command: `python -m uvicorn app.main:app --host 127.0.0.1 --port ${apiPort}`,
      cwd: './backend',
      url: `${apiBaseUrl}/api/health`,
      reuseExistingServer: true,
    },
  ],
});