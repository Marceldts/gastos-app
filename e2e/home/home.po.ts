import { type Page } from '@playwright/test'

export class HomePageObject {
  errorMessage: string = ''

  setAlertErrorMessageListener(page: Page) {
    page.on('dialog', dialog => {
      this.errorMessage = dialog.message()
      dialog.dismiss()
    })
  }

  async goToHome(page: Page) {
    await page.goto('http://localhost:3000/')
  }

  async goToHomeWithExpensesForm(page: Page) {
    await page.goto('http://localhost:3000/home?addExpense=true')
  }

  async goToHomeWithUserForm(page: Page) {
    await page.goto('http://localhost:3000/home?addUser=true')
  }

  async clickAddExpense(page: Page) {
    await page.click('text=Añadir gasto')
  }

  async clickAddUser(page: Page) {
    await page.click('text=Añadir miembro al grupo')
  }

  async isMainTableVisible(page: Page) {
    const isGastosVisible = await page.isVisible('text=Gastos')
    const isBalanceVisible = await page.isVisible('text=Balance del grupo')
    const isAñadirGastoVisible = await page.isVisible('text=Añadir gasto')
    const isAñadirMiembroVisible = await page.isVisible('text=Añadir miembro al grupo')
    return isGastosVisible && isBalanceVisible && isAñadirGastoVisible && isAñadirMiembroVisible
  }

  async clickSend(page: Page) {
    await page.click('text=Enviar')
  }

  async clickCancel(page: Page) {
    await page.click('text=Cancelar')
  }

  async isExpenseFormVisible(page: Page) {
    return await page.locator('#expense-form').isVisible()
  }

  async isUserFormVisible(page: Page) {
    return await page.locator('#user-form').isVisible()
  }

  async isTextVisible(page: Page, text: string) {
    return await page.locator(`text=${text}`).isVisible()
  }

  async fillAmount(page: Page, amount: string) {
    const amountInput = page.locator('input[type="number"]')
    await amountInput.fill(amount)
  }

  async fillDescription(page: Page, description: string) {
    const descriptionInput = page.locator('input[type="text"]')
    await descriptionInput.fill(description)
  }

  async fillDate(page: Page, date: string) {
    const dateInput = page.locator('input[type="date"]')
    await dateInput.fill(date)
  }

  async fillUsername(page: Page, username: string) {
    const usernameInput = page.locator('input[type="text"]')
    await usernameInput.fill(username)
  }

  async cleanLocalStorage(page: Page) {
    await page.evaluate(() => {
      localStorage.clear()
    })
  }

  async generateRandomNotUsedUsername(page: Page) {
    let username: string
    let isUnique: boolean = false
    do {
      username =
        'Test ' +
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, 'a')
      isUnique = !(await this._isUsernameRepeated(page, username))
    } while (!isUnique)
    return username
  }

  private async _isUsernameRepeated(page: Page, username: string) {
    const isUsernameVisible = await page.locator(`text=${username}`).isVisible()
    return isUsernameVisible
  }
}
