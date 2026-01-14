import { Page, expect } from '@playwright/test';

export async function acceptNextDialog(page: Page, containsText?: string) {
  page.once('dialog', async (dialog) => {
    if (containsText) expect(dialog.message()).toContain(containsText);
    await dialog.accept();
  });
}
