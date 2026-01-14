# DemoBlaze QA Automation
This project demonstrates a simple QA automation setup for the DemoBlaze website using Playwright (UI,API testing) and k6 (Performance testing).

# Note: Important!
Since the website is public, there will be accounts and passwords already registered by previous users. Therefore, I want each test to be unique with my own account and password, so I've implemented a system where I register a new account each time I run a test and use that account throughout the entire test suite.

# Testcase suite for DemoBlaze
Will be stored in *deliverables* folder.

## Framework Structure
- pages/: Page Objects (POM)
- fixtures/: Shared Playwright fixtures
- utils/: Helpers and utilities
- tests/
  - setup/: Auth setup (storageState)
  - ui/: UI tests (login, cart, search)
  - api/: API smoke tests
  - regression/: Regression flows
  - performance/: k6 performance smoke tests

## Rationale:
- UI, API, regression, and performance tests are separated for clarity.
- Authentication is handled once in setup to keep UI tests fast and stable.
- Regression tests reuse authenticated state.
- Performance tests are lightweight smoke checks, not full load tests.

## How to Run Tests

### Install dependencies
```bash
npm ci
npx playwright install

**Run all UI & API tests
npx playwright test

**Run regression tests only
npx playwright test tests/regression

**Run performance tests (k6)
k6 run tests/performance
