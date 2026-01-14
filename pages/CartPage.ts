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
    const body = this.page.locator('#tbodyid');
    
    await expect(body).toBeVisible();
    await expect.poll(async () => {
      return await this.page.locator('tr.success').count();
    }, { timeout: 15000 }).toBeGreaterThan(0);

  }

  async deleteProductByName(name: string) {
    const row = this.page.locator(Sel.cart.row).filter({ hasText: name });
    await expect(row).toBeVisible();
    await row.locator(Sel.cart.deleteBtn).click();
    await expect(row).toHaveCount(0);
  }
}
