import { test, expect } from "@playwright/test";

test.describe('Dynamic Elements and Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-exceptions/');
    await expect(page.getByRole('heading', { name: 'Test Exceptions' })).toBeVisible();
  });

  test('should display the second row after clicking Add', async ({ page }) => {
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    // Row 2 is added after ~5s; the default expect timeout is 5s, so give it headroom
    const row2Input = page.locator('#row2 input');
    await expect(row2Input).toBeVisible({ timeout: 10_000 });
  });

  // test ("should save text in the second row", async ({ page }) => {
// });

// test ("should allow editing a disabled input", async ({ page }) => {
// });

// test ("should hide instructions after adding a row", async ({ page }) => {
// });

// test ("should handle delayed appearance of the second row", async ({ page }) => {
//     });

});

