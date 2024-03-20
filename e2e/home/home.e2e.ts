import { test, expect } from '@playwright/test'
import { HomePageObject } from './home.po'

const homePageObject = new HomePageObject()

test.beforeEach(async ({ page }) => {
  await homePageObject.goToHome(page)
})

test.afterEach(async ({ page }) => {
  await homePageObject.cleanLocalStorage(page)
})

test.describe('Expenses main', () => {
  test('should show the expenses main page', async ({ page }) => {
    await homePageObject.isMainTableVisible(page)
  })

  test.describe('Add expense', () => {
    test.beforeEach(async ({ page }) => {
      await homePageObject.clickAddExpense(page)
      homePageObject.setAlertErrorMessageListener(page)
    })
    test('should show the add expense form', async ({ page }) => {
      expect(await homePageObject.isExpenseFormVisible(page)).toBeTruthy()
    })

    test('should hide the add expense form when the cancel button is clicked', async ({ page }) => {
      await homePageObject.clickCancel(page)
      expect(await homePageObject.isExpenseFormVisible(page)).toBeFalsy()
    })

    test('should show an error message if the expense form is submitted with empty fields', async ({ page }) => {
      await homePageObject.clickSend(page)
      expect(homePageObject.errorMessage).toBe(
        '\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n',
      )
    })

    test('should show an error message if the form is submitted with invalid fields', async ({ page }) => {
      await homePageObject.fillAmount(page, '-10')
      await homePageObject.fillDescription(page, '               ')
      await homePageObject.fillDate(page, '9020-01-01')
      await homePageObject.clickSend(page)
      expect(homePageObject.errorMessage).toBe(
        '\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n',
      )
    })

    test('should add an expense if the form is submitted with valid fields', async ({ page }) => {
      const randomAmount = (Math.random() * 100).toFixed(0)
      await homePageObject.fillAmount(page, randomAmount)
      const randomDescription = Math.random().toString(36)
      await homePageObject.fillDescription(page, randomDescription)
      await homePageObject.fillDate(page, '2020-01-01')
      await homePageObject.clickSend(page)

      expect(
        await homePageObject.isTextVisible(page, `Marcel${randomDescription}${randomAmount}2020-01-01`),
      ).toBeTruthy()
      expect(await homePageObject.isExpenseFormVisible(page)).toBeFalsy()
    })
  })

  test.describe('Add user', () => {
    let username: string
    test.beforeEach(async ({ page }) => {
      await homePageObject.clickAddUser(page)
      await homePageObject.setAlertErrorMessageListener(page)
    })

    test('should show the add user form', async ({ page }) => {
      expect(await homePageObject.isUserFormVisible(page)).toBeTruthy()
    })

    test('should hide the add user form when the cancel button is clicked', async ({ page }) => {
      await homePageObject.clickCancel(page)
      expect(await homePageObject.isUserFormVisible(page)).toBeFalsy()
    })

    test('should show an error message if the user form is submitted with empty fields', async ({ page }) => {
      await homePageObject.clickSend(page)
      expect(homePageObject.errorMessage).toBe('\nName is not valid.\n')
    })

    test('should add a user if the form is submitted with valid fields', async ({ page }) => {
      // We generate a random username and check if it is not repeated to avoid conflicts
      username = await homePageObject.generateRandomNotUsedUsername(page)
      expect(await homePageObject.isTextVisible(page, username)).toBeFalsy()
      await homePageObject.fillUsername(page, username)
      await homePageObject.clickSend(page)
      expect(await homePageObject.isTextVisible(page, username)).toBeTruthy()
      expect(await homePageObject.isUserFormVisible(page)).toBeFalsy()
    })
  })
})
