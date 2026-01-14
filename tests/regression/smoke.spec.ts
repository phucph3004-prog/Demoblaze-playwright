import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test.describe('regression - smoke', () => {
  test('login -> open product -> add to cart -> cart has item', async ({ page }) => {
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.goto();

    const productName = 'Samsung galaxy s6';

    await home.findAndOpenProductByName(productName);
    await expect(page).toHaveURL(/prod\.html/);

    await product.addToCart();
    await cart.goto();

    await expect(page).toHaveURL(/cart\.html/);
    await cart.expectHasProduct(productName);
    await expect(cart.total ?? page.locator('#totalp')).toBeVisible();
  });
});
