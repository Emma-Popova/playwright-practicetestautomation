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
    const columnEnrollment = page.locator('tbody td[data-col="enrollments"]:visible');
    await group.getByRole('button', {name: 'Any'}).click();
    await page.getByRole('option', { name: '10,000+' }).click();
    
    for(const enrollment of await columnEnrollment.allTextContents()) {
        
       //(parseInt(enrollment)).toBeLessThanOrEqual(10000)->If the values ​​contain commas -> remove all commas and explicitly specify the decimal system.
        expect(parseInt(enrollment.replace(/,/g, ''), 10)).toBeGreaterThanOrEqual(10000);
        }
    });

    test('should apply multiple filters simultaneously', async ({ page }) => {
        const groupLanguage = page.getByRole('group', {name: "Language"});
        const groupLevel = page.getByRole('group', {name: "Level"});
        const groupEnrollment = page.getByRole('group', {name: "Min enrollments"});
        await groupLanguage.getByRole('radio', {name: " Python"}).click();
        await groupLevel.getByRole('checkbox', {name: " Intermediate"}).uncheck();
        await groupLevel.getByRole('checkbox', {name:" Advanced"}).uncheck();
        await groupEnrollment.getByRole('button', {name: "Any"}).click();
        await page.getByRole('option', { name: '10,000+' }).click();

        const columnLanguage = page.locator('tbody td[data-col="language"]:visible'); 
        const columnLevel = page.locator('tbody td[data-col="level"]:visible');
        const columnEnrollment = page.locator('tbody td[data-col="enrollments"]:visible');

        for (const language of await columnLanguage.allTextContents()) {
        expect(language.trim()).toBe('Python');
            } 
        for(const level of await columnLevel.allTextContents()) {
        expect(level.trim()).toBe('Beginner');
        }
       for(const enrollment of await columnEnrollment.allTextContents()) {
        expect(parseInt(enrollment.replace(/,/g, ''), 10)).toBeGreaterThanOrEqual(10000);
        } 
    });

    test('should display a message when no courses match the filters', async ({ page }) => {
        const groupLanguage = page.getByRole('group', {name: "Language"});
        const groupLevel = page.getByRole('group', {name: "Level"});
        const groupEnrollment = page.getByRole('group', {name: "Min enrollments"});
        await groupLanguage.getByRole('radio', {name: " Java"}).click();
        await groupLevel.getByRole('checkbox', {name: " Intermediate"}).uncheck();
        await groupLevel.getByRole('checkbox', {name:" Beginner"}).uncheck();
        await groupEnrollment.getByRole('button', {name: "Any"}).click();
        await page.getByRole('option', { name: '10,000+' }).click();

        await expect(page.getByText('No matching courses.', { exact: true })).toBeVisible();
   
    });

    test('should reset all filters to their default values', async ({ page }) => {
        const groupLanguage = page.getByRole('group', {name: "Language"});
        const groupLevel = page.getByRole('group', {name: "Level"});
        const groupEnrollment = page.getByRole('group', {name: "Min enrollments"});
        await groupLanguage.getByRole('radio', {name: " Java"}).click();
        await groupLevel.getByRole('checkbox', {name: " Advanced"}).uncheck();
        await groupLevel.getByRole('checkbox', {name:" Intermediate"}).uncheck();
        await groupEnrollment.getByRole('button', {name: "Any"}).click();
        await page.getByRole('option', { name: '10,000+' }).click();

        const resetButton = page.getByRole('button', {name: "Reset"});
        await expect(resetButton).toBeVisible();

        await resetButton.click();
        await expect(groupLanguage.getByRole('radio', {name: "Any"})).toBeChecked();
        await expect(groupLevel.getByRole('checkbox', {name: " Beginner"})).toBeChecked();
        await expect(groupLevel.getByRole('checkbox', {name: " Intermediate"})).toBeChecked();
        await expect(groupLevel.getByRole('checkbox', {name: " Advanced"})).toBeChecked();
        await expect(groupEnrollment.getByRole('button', {name: "Any"})).toBeVisible();
    
    });

    test('should sort courses by enrollment count in ascending order', async ({ page }) => {
        await page.getByLabel('Sort by').selectOption({ label: 'Enrollments' });
        const columnEnrollment = page.locator('tbody td[data-col="enrollments"]:visible');
        const enrollments = await columnEnrollment.allTextContents();

        const enrollmentNumbers = enrollments.map(enrollment => Number(enrollment.replace(/,/g, '').trim())
    );
        for (let i = 0; i < enrollmentNumbers.length - 1; i++) {
          expect(enrollmentNumbers[i]).toBeLessThanOrEqual(enrollmentNumbers[i + 1]);
        }

  });

    test('should sort courses alphabetically by name', async ({ page }) => {
        await page.getByLabel('Sort by').selectOption({ label: 'Course Name' });
        const columnName = page.locator('tbody td[data-col="course"]:visible');
        const courseNames = await columnName.allTextContents();

        const sortedNames = [...courseNames].sort((a, b) =>  a.trim().localeCompare(b.trim()));

            expect(courseNames.map(name => name.trim())).toEqual(sortedNames);
  });
   
  });

// Test case 8: Sort by Course Name (alphabetical)
// Open page
// Set Sort by = Course Name
// Verify visible rows are ordered A→Z by course name
// Verify order updates after changing filters
// Fails if string compare ignores case/whitespace inconsistently

