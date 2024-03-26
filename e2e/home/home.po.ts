import { type Page } from '@playwright/test'

export class HomePageObject {
  errorMessage: string = ''

  setAlertErrorMessageListener(page: Page) {
    page.on('dialog', dialog => {
      this.errorMessage = dialog.message()
      dialog.dismiss()
    })
  }

  confirmDialog(page: Page) {
    page.on('dialog', async dialog => {
      await dialog.accept()
    })
  }

  async goToDefaultHomePage(page: Page) {
    await page.goto('http://localhost:3000')
  }

  async goToHomePage(page: Page) {
    await page.goto('http://localhost:3000/home')
  }

  async goToHomePageWithCreateGroupParam(page: Page) {
    await page.goto('http://localhost:3000/home?createGroup=true')
  }

  async clickCreateGroup(page: Page) {
    await page.click('text=Crear nuevo grupo')
  }

  async clickCloseCreateGroupModal(page: Page) {
    await page.click('text=×')
  }

  async clickDeleteIcon(page: Page, id: string) {
    await page
      .locator('li')
      .filter({ hasText: `Group ${id}` })
      .getByRole('img')
      .click()
  }

  async createGroup(page: Page) {
    await page.getByRole('button', { name: 'Crear', exact: true }).click()
  }

  async isMainPageVisible(page: Page) {
    return await page.isVisible('text=Inicio')
  }

  async isCreateGroupModalVisible(page: Page) {
    return await page.getByRole('dialog').isVisible()
  }

  async isGroupIdVisible(page: Page, id: string) {
    return await page.isVisible(`text=Group ${id}`)
  }

  async fillIdTextbox(page: Page, id: string) {
    const idTextbox = page.getByRole('textbox')
    idTextbox.fill(id)
  }

  async hasGoneToGroupPage(page: Page, id: string) {
    return page.url().includes(`group/${id}`)
  }

  cleanLocalStorage(page: Page) {
    page.evaluate(() => localStorage.clear())
  }
}
