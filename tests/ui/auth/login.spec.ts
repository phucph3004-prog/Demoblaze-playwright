import { test, expect } from '../../../fixtures/core';
import { randomCreds } from '../../../utils/credentials';
import { toBase64 } from '../../../utils/crypto';
import { acceptNextDialog } from '../../../utils/dialog';

async function signupUser(request: any, username: string, password: string) {

  const res = await request.post('https://api.demoblaze.com/signup', {
    data: { username, password: toBase64(password) },
  });

  expect([200, 201]).toContain(res.status());
}

test.describe('Login & Logout (no storageState) - DemoBlaze', () => {
  test('Login with valid credentials shows Welcome text', async ({ page, request, homePage, loginModal }) => {
    const creds = randomCreds();

    await signupUser(request, creds.username, creds.password);

    await homePage.goto();
    await homePage.openLogin();
    await loginModal.expectOpen();

    page.once('dialog', async d => d.accept());
    await loginModal.login(creds.username, creds.password);
    await expect(page.locator('#logInModal')).toBeHidden();
    await homePage.expectLoggedIn(creds.username);
    await expect(page.locator('#login2')).toBeHidden();
  });

  test('Login negative - missing username should show alert', async ({ page, homePage, loginModal }) => {
    await homePage.goto();
    await homePage.openLogin();
    await loginModal.expectOpen();
  
    let dialogText = '';
  
    page.once('dialog', async d => {
      dialogText = d.message();
      await d.accept();
    });
  
    await loginModal.password.fill('any');
    await loginModal.submit.dispatchEvent('click');
    await expect
      .poll(() => dialogText, { timeout: 5000 })
      .toContain('Please fill out Username and Password.');

    await expect(page.locator('#login2')).toBeVisible();
  });

  test('Logout should return to guest state', async ({ page, request, homePage, loginModal }) => {
    const creds = randomCreds('ui_noauth');

    await signupUser(request, creds.username, creds.password);

    await homePage.goto();
    await homePage.openLogin();
    await loginModal.expectOpen();

    page.once('dialog', async d => d.accept());
    await loginModal.login(creds.username, creds.password);

    await expect(page.locator('#logInModal')).toBeHidden();
    await homePage.expectLoggedIn(creds.username);
    await page.locator('#logout2').click();
    await expect(page.locator('#login2')).toBeVisible();
    await expect(page.locator('#nameofuser')).toHaveText('');
  });
});
