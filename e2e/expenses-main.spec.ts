/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, type Page } from '@playwright/test'

const isUsernameRepeated = async (page: Page, username: string): Promise<boolean> => {
  const isUsernameVisible = await page.locator(`text=${username}`).isVisible()
  return isUsernameVisible
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/home')
})

test.afterEach(async ({ page }) => {
  await page.evaluate(() => localStorage.clear())
})

test.describe('Expenses main', () => {
  test('should show the expenses main page', async ({ page }) => {
    expect(await page.isVisible('text=Gastos')).toBeTruthy()
    expect(await page.isVisible('text=Balance del grupo')).toBeTruthy()
    expect(await page.isVisible('text=Añadir gasto')).toBeTruthy()
    expect(await page.isVisible('text=Añadir miembro al grupo')).toBeTruthy()
  })

  test.describe('Add expense', () => {
    let errorMessage: string

    test.beforeEach(async ({ page }) => {
      await page.click('text=Añadir gasto')
      page.on('dialog', dialog => {
        errorMessage = dialog.message()
        dialog.dismiss()
      })
    })
    test('should show the add expense form', async ({ page }) => {
      expect(await page.locator('.expense-form').isVisible()).toBeTruthy()
    })

    test('should hide the add expense form when the cancel button is clicked', async ({ page }) => {
      await page.click('text=Cancelar')
      expect(await page.locator('.expense-form').isVisible()).toBeFalsy()
    })

    test('should hide the add expense form when clicking add user button', async ({ page }) => {
      await page.click('text=Añadir miembro al grupo')
      expect(await page.locator('.expense-form').isVisible()).toBeFalsy()
    })

    test('should show an error message if the expense form is submitted with empty fields', async ({ page }) => {
      await page.click('text=Enviar')
      expect(errorMessage).toBe('\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n')
    })

    test('should show an error message if the form is submitted with invalid fields', async ({ page }) => {
      const amountInput = page.getByRole('spinbutton')
      await amountInput.fill('-10')
      const descriptionInput = page.locator('input[type="text"]')
      await descriptionInput.fill('                    ')
      const dateInput = page.getByLabel('Selecciona una fecha:')
      await dateInput.fill('9020-01-01')
      await page.click('text=Enviar')
      expect(errorMessage).toBe('\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n')
    })

    test('should add an expense if the form is submitted with valid fields', async ({ page }) => {
      const amountInput = page.getByRole('spinbutton')
      const randomAmount = (Math.random() * 100).toFixed(4)
      await amountInput.fill(`${randomAmount}`)
      const descriptionInput = page.locator('input[type="text"]')
      const randomDescription = Math.random().toString(36)
      await descriptionInput.fill(randomDescription)
      const dateInput = page.getByLabel('Selecciona una fecha:')
      await dateInput.fill('2020-01-01')
      await page.click('text=Enviar')
      expect(await page.locator(`text=Marcel${randomDescription}${randomAmount}2020-01-01`).isVisible()).toBeTruthy()
      expect(await page.locator('.expense-form').isVisible()).toBeFalsy()
    })
  })

  test.describe('Add user', () => {
    let errorMessage: string
    let username: string
    test.beforeEach(async ({ page }) => {
      await page.click('text=Añadir miembro al grupo')
      page.on('dialog', dialog => {
        errorMessage = dialog.message()
        dialog.dismiss()
      })
    })

    test('should show the add user form', async ({ page }) => {
      await page.click('text=Añadir miembro al grupo')
      expect(await page.locator('.user-form').isVisible()).toBeTruthy()
    })

    test('should hide the add user form when the cancel button is clicked', async ({ page }) => {
      await page.click('text=Cancelar')
      expect(await page.locator('.user-form').isVisible()).toBeFalsy()
    })

    test('should hide the add user form when clicking add expense button', async ({ page }) => {
      await page.click('text=Añadir gasto')
      expect(await page.locator('.user-form').isVisible()).toBeFalsy()
    })

    test('should show an error message if the user form is submitted with empty fields', async ({ page }) => {
      await page.click('text=Enviar')
      expect(errorMessage).toBe('\nName is not valid.\n')
    })

    test('should add a user if the form is submitted with valid fields', async ({ page }) => {
      // We generate a random username and check if it is not repeated to avoid conflicts
      let isUnique: boolean = false
      do {
        username =
          'Test ' +
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, 'a')
        isUnique = !(await isUsernameRepeated(page, username))
      } while (!isUnique)
      expect(await page.locator(`text=${username}`).isVisible()).toBeFalsy()

      const nameInput = page.getByRole('textbox')
      await nameInput.fill(username)
      await page.click('text=Enviar')
      expect(await page.locator(`text=${username}`).isVisible()).toBeTruthy()
      expect(await page.locator('.user-form').isVisible()).toBeFalsy()
    })
  })
})
