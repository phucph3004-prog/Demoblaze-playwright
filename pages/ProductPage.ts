import { Page, Locator, expect } from '@playwright/test';
import { Sel } from '../utils/selectors';
import { acceptNextDialog } from '../utils/dialog';

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(Sel.productDetail.title);
    this.addToCartBtn = page.locator(Sel.productDetail.addToCart);
  }

  async expectTitle(expected: string) {
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText(expected);
  }

  async addToCart() {
    await this.addToCartBtn.click();
    await acceptNextDialog(this.page);
  }
}
