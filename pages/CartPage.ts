import { Page, Locator, expect } from '@playwright/test';
import { Sel } from '../utils/selectors';

export class CartPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly total: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator(Sel.cart.row);
    this.total = page.locator(Sel.cart.total);
  }

  async goto() {
    await this.page.goto('/cart.html');
    await expect(this.page.locator(Sel.cart.pageWrapper)).toBeVisible();
  }

  async expectHasProduct(name: string) {
    const rows = this.page.locator('tr.success');
    await expect(rows.first()).toBeVisible({ timeout: 6000 });
    await expect(
      this.page.locator(Sel.cart.row).filter({ hasText: name })
    ).toBeVisible();
  }

  async deleteProductByName(name: string) {
    const row = this.page.locator(Sel.cart.row).filter({ hasText: name });
    await expect(row).toBeVisible();
    await row.locator(Sel.cart.deleteBtn).click();
    await expect(row).toHaveCount(0);
  }
}
