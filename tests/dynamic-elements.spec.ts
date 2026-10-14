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

  test ("should save text in the second row", async ({ page }) => {
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const row2 = page.locator('#row2.row');
    const row2Input = row2.locator('input');
    const inputText = 'Apple';

    await expect(row2Input).toBeVisible({ timeout: 10_000 });
    await row2Input.fill(inputText);

    await row2.getByRole('button', { name: 'Save' }).click();
    await expect(row2Input).toHaveValue(inputText);

   
});

test ("should allow editing a disabled input", async ({ page }) => {

    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const row2 = page.locator('#row2.row');
    const row2Input = row2.locator('input');
    const row1 = page.locator('#row1.row');
    const inputText = 'Apple';

    await expect(row2Input).toBeVisible({ timeout: 10_000 });
    await row2Input.fill(inputText);

    await row2.getByRole('button', { name: 'Save' }).click();
    await expect(row2Input).toHaveValue(inputText);

    await row2.getByRole('button', {name: 'Remove'}).click();
    await expect(row2Input).toBeDisabled();
    
    await row1.getByRole('button', {name: 'Add', exact: true}).click();
    await expect(row2Input).toBeVisible({ timeout: 10_000 });
    await row2.getByRole('button', {name: 'Edit'}).click();
    await expect(row2Input).toBeEnabled();

});

test('should display confirmation message after adding a row', async ({ page }) => {
    await page.getByRole('button', { name: 'Add', exact: true }).click();

    const row2Input = page.locator('#row2 input');
    await expect(row2Input).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('#confirmation')).toHaveText('Row 2 was added');
});


test.skip('should demonstrate a timeout when the second row takes longer to appear', async ({ page }) => {
  await page.getByRole('button', { name: 'Add', exact: true }).click();

  const row2Input = page.locator('#row2 input');

  // The second row takes about 5 seconds to appear.
  // A 3-second timeout is not sufficient.
  await expect(row2Input).toBeVisible({ timeout: 3_000 });
    });

});