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
     
        } 
    });

  test('should display only Beginner courses when other levels are unchecked', async ({ page }) => {
     const group = page.getByRole('group', {name: "Level"});
     const columnLevel = page.locator('tbody td[data-col="level"]:visible');
     await group.getByRole('checkbox', {name: " Intermediate"}).uncheck();
     await group.getByRole('checkbox', {name:" Advanced"}).uncheck();

    for(const level of await columnLevel.allTextContents()) {
        expect(level.trim()).toBe('Beginner');
    }
  });

  test('should display only courses with at least 10,000 enrollments', async ({ page }) => {
    const group = page.getByRole('group', {name: "Min enrollments"});
    const coulmnEnrollement = page.locator('tbody td[data-col="enrollments"]:visible');
    await group.getByRole('button', {name: 'Any'}).click();
    await page.getByRole('option', { name: '10,000+' }).click();
    
    for(const enrollment of await coulmnEnrollement.allTextContents()) {
        
       // expect(parseInt(enrollment)).toBeLessThanOrEqual(10000) 
       //If the values ​​contain commas -> remove all commas and explicitly specify the decimal system.
        expect(parseInt(enrollment.replace(/,/g, ''), 10)).toBeGreaterThanOrEqual(10000);
        }
    });

    test('should apply multiple filters simultaneously', async ({ page }) => {
        const groupLanguage = page.getByRole('group', {name: "Language"});
        const groupLevel = page.getByRole('group', {name: "Level"});
        const groupEnrollment = page.getByRole('group', {name: "Min enrollments"});
        await groupLanguage.getByRole('radio', {name: ' Python'}).click();
        await groupLevel.getByRole('checkbox', {name: " Intermediate"}).uncheck();
        await groupLevel.getByRole('checkbox', {name:" Advanced"}).uncheck();
        await groupEnrollment.getByRole('button', {name: 'Any'}).click();
        await page.getByRole('option', { name: '10,000+' }).click();

        const columnLanguage = page.locator('tbody td[data-col="language"]:visible'); 
        const columnLevel = page.locator('tbody td[data-col="level"]:visible');
        const coulmnEnrollement = page.locator('tbody td[data-col="enrollments"]:visible');

        for (const language of await columnLanguage.allTextContents()) {
        expect(language.trim()).toBe('Python');
            } 
        for(const level of await columnLevel.allTextContents()) {
        expect(level.trim()).toBe('Beginner');
        }
       for(const enrollment of await coulmnEnrollement.allTextContents()) {
        expect(parseInt(enrollment.replace(/,/g, ''), 10)).toBeGreaterThanOrEqual(10000);
        } 
     });

   });
//    Select Language = Python
// Uncheck Intermediate and Advanced
// Set Min enrollments = 10,000+
// Verify only Python Beginner courses with ≥ 10,000 enrollments are visible
// Fails if incorrect courses are visible





