import { Page, Locator, expect } from '@playwright/test';
import { Sel } from '../utils/selectors';

export class LoginModal {
  readonly page: Page;
  readonly root: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.locator(Sel.loginModal.root);
    this.username = page.locator(Sel.loginModal.username);
    this.password = page.locator(Sel.loginModal.password);
    this.submit = page.locator(Sel.loginModal.submit);
  }

  async expectOpen() {
    await expect(this.root).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }
}
