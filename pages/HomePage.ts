import { Page, Locator, expect } from '@playwright/test';
import { Sel } from '../utils/selectors';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly welcomeText: Locator;
  readonly productCards: Locator;
  readonly nextBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator(Sel.nav.login);
    this.logoutLink = page.locator(Sel.nav.logout);
    this.welcomeText = page.locator(Sel.nav.welcome);
    this.productCards = page.locator(Sel.product.cards);
    this.nextBtn = page.locator(Sel.product.next);
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page.locator('#tbodyid')).toBeVisible();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async expectLoggedIn(username: string) {
    await expect(this.welcomeText).toContainText(username);
    await expect(this.logoutLink).toBeVisible();
    await expect(this.loginLink).toBeHidden();
  }

  async findAndOpenProductByName(productName: string, maxPages = 6): Promise<void> {
    for (let i = 0; i < maxPages; i++) {
      const titles = await this.page.locator(Sel.product.cardTitle).allTextContents();
      const productIdx = titles.findIndex(t => t.trim() === productName);
      if (productIdx >= 0) {
        await this.page.locator(Sel.product.cardTitle).nth(productIdx).click();
        return;
      }
      if (!(await this.nextBtn.isVisible())) break;
      await this.nextBtn.click();
      await expect(this.productCards.first()).toBeVisible();
    }
    throw new Error(`Product not found: ${productName}!`);
  }
}
