import { test, expect } from '@playwright/test';
test('scrolling portfolio exposes story and runway without horizontal overflow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('SHYAAM');
  await page.getByRole('link', { name: 'The runway' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator('#work')).toBeInViewport();
  await expect(page.locator('[data-system-part]')).toHaveCount(4);
  const runway = page.getByRole('region', { name: 'Project runway' });
  if (await page.locator('.runway-card').count() > 1) {
    await page.getByRole('button', { name: 'Next projects' }).click();
    await expect.poll(() => runway.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `docs/screenshots/flight-${test.info().project.name}.png` });
});
test('anonymous visitors cannot enter the console or unknown projects', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login/);
  const response = await page.goto('/projects/never-published');
  expect(response?.status()).toBe(404);
});
