import { test, expect } from '../../fixtures/core';

test.describe('Authenticated session (storageState) - DemoBlaze', () => {
  test('Should show Welcome and Log out from stored session', async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page.locator('#nameofuser')).toBeVisible();
    await expect(homePage.page.locator('#logout2')).toBeVisible();
  });
});
