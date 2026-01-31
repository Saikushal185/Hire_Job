# Testing Guide

## Overview

This guide covers the testing strategy for HireMind, including unit tests, integration tests, and end-to-end tests.

## Frontend Testing

### Setup

Install testing dependencies:

```bash
cd frontend
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest ts-jest
```

### Jest Configuration

Create `jest.config.js`:

```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
```

### Example Component Test

```tsx
// __tests__/components/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/HireMind/)).toBeInTheDocument();
  });

  it('renders privacy and terms links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument();
  });
});
```

### Running Tests

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # Coverage report
```

## Backend Testing

### Setup

```bash
cd resume-matcher
pip install pytest pytest-asyncio httpx
```

### Example API Test

```python
# test_main.py
import pytest
from httpx import AsyncClient
from main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_parse_resume_invalid_file():
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post(
            "/api/parser",
            files={"file": ("test.txt", b"content", "text/plain")}
        )
        assert response.status_code == 400
```

### Running Backend Tests

```bash
pytest                    # Run all tests
pytest -v                 # Verbose output
pytest --cov=main         # With coverage
```

## E2E Testing (Playwright)

### Setup

```bash
npm install -D @playwright/test
npx playwright install
```

### Example E2E Test

```ts
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/HireMind/);
  await expect(page.getByRole('link', { name: 'Jobs' })).toBeVisible();
});

test('resume upload workflow', async ({ page }) => {
  await page.goto('/');
  await page.setInputFiles('input[type="file"]', 'test-resume.pdf');
  await expect(page.getByText(/Score/)).toBeVisible({ timeout: 10000 });
});
```

## Continuous Integration

Tests run automatically via GitHub Actions on:
- Push to `main`
- Pull requests

See `.github/workflows/ci.yml` for configuration.
