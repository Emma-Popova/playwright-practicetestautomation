import { test, expect } from "@playwright/test";

test.describe("Login test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice-test-login/");

});


test("Positive Login test", async ({ page }) => {
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing TEST_USERNAME or TEST_PASSWORD in .env");
  }

  await page
    .getByRole('textbox', { name: "Username" })
    .fill(username);
  await page
    .getByRole('textbox', { name: "Password" })
    .fill(password);
  await page.getByRole('button', { name: "Submit" }).click();
  await expect(page).toHaveURL(/.*logged-in-successfully/);
  await expect(
    page.getByText(/Congratulations student. You successfully logged in!/),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();

        
    });
});

// Test case 1: Positive LogIn test
// Open page
// Type username student into Username field
// Type password Password123 into Password field
// Push Submit button
// Verify new page URL contains practicetestautomation.com/logged-in-successfully/
// Verify new page contains expected text ('Congratulations' or 'successfully logged in')
// Verify button Log out is displayed on the new page
