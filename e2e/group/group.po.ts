import { type Page } from '@playwright/test'

export class GroupPageObject {
  errorMessage: string = ''

  setAlertErrorMessageListener(page: Page) {
    page.on('dialog', dialog => {
      this.errorMessage = dialog.message()
      dialog.dismiss()
    })
  }

  async goToGroupExpensesPage(page: Page) {
    await page.goto('http://localhost:3000/group/1')
  }

  async goToGroupWithExpensesForm(page: Page) {
    await page.goto('http://localhost:3000/group/1?addExpense=true')
  }

  async goToGroupWithUserForm(page: Page) {
    await page.goto('http://localhost:3000/group/1?addUser=true')
  }

  async goToEmptyGroupPage(page: Page) {
    await page.goto('http://localhost:3000/group/1990291')
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

  async isNoExpensesVisible(page: Page) {
    return await page.isVisible('text=No hay gastos')
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

  async isGroupEmptyWarningVisible(page: Page) {
    return await page.locator('text=No hay usuarios en el grupo').isVisible()
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

  async urlIncludesParam(page: Page, param: string) {
    return page.url().includes(param)
  }

  private async _isUsernameRepeated(page: Page, username: string) {
    const isUsernameVisible = await page.locator(`text=${username}`).isVisible()
    return isUsernameVisible
  }
}
