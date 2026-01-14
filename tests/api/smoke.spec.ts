import { test, expect } from '@playwright/test';

//Smoke API test example
test('API smoke example - reqres create user', async ({ request }) => {
  const res = await request.post('https://api.demoblaze.com/pagination', {
    data: { id: '2' }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toBeTruthy();
});
