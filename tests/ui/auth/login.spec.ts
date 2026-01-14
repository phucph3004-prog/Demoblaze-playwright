import { test, expect } from '../../../fixtures/core';

test.describe('Login & Logout (no storageState) - DemoBlaze', () => {
  test('Login with valid credentials shows Welcome text', async ({ page, homePage, loginModal }) => {
    const username = process.env.USER ?? 'qa_challenge_user';
    const password = process.env.PASS ?? 'qa_challenge_pass';

    await homePage.goto();

    await test.step('Open login modal', async () => {
      await homePage.openLogin();
      await loginModal.expectOpen();
    });

    await test.step('Submit login and handle possible dialog', async () => {
      page.once('dialog', async d => d.accept());
      await loginModal.login(username, password);
    });

    await test.step('Validate logged-in state', async () => {
      await homePage.expectLoggedIn(username);
      await expect(page.locator('#login2')).toBeHidden();
    });
  });

  test('Login negative - missing username should show alert', async ({ page, homePage, loginModal }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginModal.expectOpen();

    const dialogPromise = page.waitForEvent('dialog');
    await loginModal.login('', 'any');
    const dialog = await dialogPromise;

    expect(dialog.message().toLowerCase()).toContain('fill');
    await dialog.accept();
  });

  test('Logout should return to guest state', async ({ page, homePage, loginModal }) => {
    const username = process.env.USER ?? 'qa_challenge_user';
    const password = process.env.PASS ?? 'qa_challenge_pass';

    await homePage.goto();
    await homePage.openLogin();
    await loginModal.expectOpen();

    page.once('dialog', async d => d.accept());
    await loginModal.login(username, password);

    await homePage.expectLoggedIn(username);

    await test.step('Logout', async () => {
      await page.locator('#logout2').click();
      await expect(page.locator('#login2')).toBeVisible();
      await expect(page.locator('#nameofuser')).toBeHidden();
    });
  });
});
