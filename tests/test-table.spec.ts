import { test, expect } from "@playwright/test";

test.describe('Course Filtering and Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/practice-test-table/');
    await expect(page.getByRole('heading', { name: 'Test Table' })).toBeVisible();
  });

  test('should display only Java courses when Java is selected', async ({ page }) => {
    const group = page.getByRole('group', {name: "Language"});
    // Use :visible to exclude hidden cells, which may still be included by allTextContents().
    const columnLanguage = page.locator('tbody td[data-col="language"]:visible'); 
   
    await group.getByRole('radio', {name: " Java"}).click();
    
    await expect(columnLanguage).not.toHaveCount(0);

    for (const language of await columnLanguage.allTextContents()) {
        expect(language.trim()).toBe('Java');
        //const languages = await columnLanguage.allTextContents();
        //console.log(languages);
        } 
  
  });

//   test('should display only Beginner courses when other levels are unchecked', async ({ page }) => {

//   });

//   test('should display only courses with at least 10,000 enrollments', async ({ page }) => {

//   });

//   test('should apply multiple filters simultaneously', async ({ page }) => {

//   });

//   test('should display a message when no courses match the filters', async ({ page }) => {

//   });

//   test('should reset all filters to their default values', async ({ page }) => {

//   });

//   test('should sort courses by enrollment count in ascending order', async ({ page }) => {

//   });

//   test('should sort courses alphabetically by name', async ({ page }) => {

//  });


});