import { test, expect, request } from '@playwright/test';
import { ensureDir } from '../../utils/fs';
import { randomCreds } from '../../utils/credentials';
import { HomePage } from '../../pages/HomePage';
import { LoginModal } from '../../pages/LoginModal';
import { toBase64 } from '../../utils/crypto';

test('auth setup', async ({ browser }) => {
  const u = process.env.USER?.trim();
  const p = process.env.PASS?.trim();
  const creds = u && p ? { username: u, password: p } : randomCreds();

  const api = await request.newContext();
  const apiCreds = { username: creds.username, password: toBase64(creds.password) };

  if (!u || !p) {
    const s = await api.post('https://api.demoblaze.com/signup', { data: apiCreds });
    expect([200, 201]).toContain(s.status());
  }

  const l = await api.post('https://api.demoblaze.com/login', { data: apiCreds });
  expect((await l.text()).toLowerCase()).toContain('token');
  await api.dispose();

  await ensureDir('storage/.auth');

  const context = await browser.newContext();
  const page = await context.newPage();
  const home = new HomePage(page);
  const login = new LoginModal(page);

  await home.goto();
  await home.openLogin();
  await login.expectOpen();

  let dialog: string | null = null;
  page.once('dialog', async d => { dialog = d.message(); await d.accept(); });

  await login.login(creds.username, creds.password);

  if (dialog) throw new Error(`Login UI error: ${dialog}`);

  await expect(page.locator('#logout2')).toBeVisible({ timeout: 3000 });
  await expect(page.locator('#nameofuser')).toContainText(creds.username, { timeout: 3000 });

  await context.storageState({ path: 'storage/.auth/user.json' });
  await context.close();
});
