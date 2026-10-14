import { test, expect } from "@playwright/test";

test.describe("Login test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice-test-login/");
    
});
  const username = process.env.TEST_USERNAME;
  const password = process.env.TEST_PASSWORD;

  if (!username || !password) {
    throw new Error("Missing TEST_USERNAME or TEST_PASSWORD in .env");
  }

test("Positive Login test", async ({ page }) => {
  
   await page.getByRole('textbox', { name: "Username" }).fill(username);
   await page.getByRole('textbox', { name: "Password" }).fill(password);
   await page.getByRole('button', { name: "Submit" }).click();
   await expect(page).toHaveURL(/.*logged-in-successfully/);
   await expect(page.getByText(/Congratulations student. You successfully logged in!/),).toBeVisible();
   await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
        
    });

test("Negative Username test", async ({ page }) => {
    await page.getByRole('textbox', { name: "Username" }).fill("incorrectUser");
    await page.getByRole('textbox', { name: "Password" }).fill(password);
    await page.getByRole('button', { name: "Submit" }).click();
    await expect(page.locator('#error')).toHaveText("Your username is invalid!");

    });

test("Negative Password test", async ({ page }) => {
    await page.getByRole('textbox', { name: "Username" }).fill(username);
    await page.getByRole('textbox', { name: "Password" }).fill("incorrectPassword");
    await page.getByRole('button', { name: "Submit" }).click();
    await expect(page.locator('#error')).toHaveText("Your password is invalid!");
   
    });

});