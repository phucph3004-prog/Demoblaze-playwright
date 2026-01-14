import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginModal } from '../pages/LoginModal';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

type POMFixtures = {
  homePage: HomePage;
  loginModal: LoginModal;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<POMFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginModal: async ({ page }, use) => {
    await use(new LoginModal(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
