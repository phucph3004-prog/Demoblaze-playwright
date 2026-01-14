import { test, expect } from '../../fixtures/core';

test.describe('Search/Browse - DemoBlaze (fixtures per POM)', () => {
  test('Search by criteria (product name) via browsing + pagination', async ({ page, homePage, productPage }) => {
    const criteria = process.env.SEARCH_CRITERIA ?? 'Samsung galaxy s6';

    await test.step('Open homepage', async () => {
      await homePage.goto();
    });

    await test.step('Find and open product by name (criteria)', async () => {
      await homePage.findAndOpenProductByName(criteria, 6);
    });

    await test.step('Validate product detail', async () => {
      await productPage.expectTitle(criteria);
      await expect(page).toHaveURL(/prod\.html\?idp_=/);
    });
  });

  test('Search negative - product not found should fail gracefully (handled)', async ({ homePage }) => {
    await homePage.goto();
    const notFound = 'NonExistingProductXYZ__';

    await expect(async () => {
      await homePage.findAndOpenProductByName(notFound);
    }).rejects.toThrow(/Product not found/);
  });
});
