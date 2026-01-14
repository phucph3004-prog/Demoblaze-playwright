import { test, expect, request } from '@playwright/test';
import { ensureDir } from '../../utils/fs';
import { randomCreds } from '../../utils/credentials';
import { HomePage } from '../../pages/HomePage';
import { LoginModal } from '../../pages/LoginModal';
import { toBase64 } from '../../utils/crypto';

test('auth setup', async ({ browser }) => {

  const creds = randomCreds();
  const apiCreds = { username: creds.username, password: toBase64(creds.password) };

  const api = await request.newContext();
  const signupRes = await api.post('https://api.demoblaze.com/signup', { data: apiCreds });
  expect([200, 201]).toContain(signupRes.status());
  await api.dispose();

  await ensureDir('storage/.auth');

  const context = await browser.newContext();
  const page = await context.newPage();
  const home = new HomePage(page);
  const login = new LoginModal(page);

  await home.goto();
  await home.openLogin();
  await login.expectOpen();

  let dialogMsg: string | null = null;
  page.once('dialog', async (d) => {
    dialogMsg = d.message();
    await d.accept();
  });

  await login.login(creds.username, creds.password);
  await expect(page.locator('#logInModal')).toBeHidden();

  if (dialogMsg && /wrong password|user does not exist/i.test(dialogMsg)) {
    throw new Error(`Login UI failed: ${dialogMsg}`);
  }

  await expect(page.locator('#logout2')).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText(creds.username);
  await context.storageState({ path: 'storage/.auth/user.json' });
  await context.close();
});
