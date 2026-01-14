import { test } from '../../fixtures/core';

test.describe('Cart Detail', () => {
  test('Add product then verify in cart', async ({ homePage, productPage, cartPage }) => {
    const productName = process.env.SEARCH_PRODUCT ?? 'Samsung galaxy s6';

    await test.step('Open homepage (already authenticated via storageState)', async () => {
      await homePage.goto();
    });

    await test.step('Open product detail by name', async () => {
      await homePage.findAndOpenProductByName(productName, 6);
      await productPage.expectTitle(productName);
    });

    await test.step('Add to cart and verify in cart', async () => {
      await productPage.addToCart();
      await cartPage.goto();
      await cartPage.expectHasProduct(productName);
    });
  });

  test('Delete item from cart', async ({ cartPage }) => {
    const productName = process.env.SEARCH_PRODUCT ?? 'Samsung galaxy s6';
    await cartPage.goto();

    const row = cartPage.page.locator('tr.success').filter({ hasText: productName });
    if (await row.count()) {
      await cartPage.deleteProductByName(productName);
    }
  });
});
