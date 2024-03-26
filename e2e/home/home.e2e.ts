import { test, expect, type Page } from '@playwright/test'
import { HomePageObject } from './home.po'

test.describe('Home page', () => {
  const homePageObject = new HomePageObject()

  test.beforeEach(async ({ page }) => {
    await homePageObject.goToHomePage(page)
  })

  test.describe('Initial navigation', () => {
    test('should show the home page', async ({ page }) => {
      expect(await homePageObject.isMainPageVisible(page)).toBeTruthy()
    })

    test('should show the home page when navigating to the default URL', async ({ page }) => {
      await homePageObject.goToDefaultHomePage(page)
      expect(await homePageObject.isMainPageVisible(page)).toBeTruthy()
    })

    test('should show the home page when navigating to the URL with the createGroup param', async ({ page }) => {
      await homePageObject.goToHomePageWithCreateGroupParam(page)
      expect(await homePageObject.isMainPageVisible(page)).toBeTruthy()
      expect(await homePageObject.isCreateGroupModalVisible(page)).toBeTruthy()
    })
  })

  test.describe('Create group', () => {
    test.beforeEach(async ({ page }) => {
      homePageObject.cleanLocalStorage(page)
      await homePageObject.clickCreateGroup(page)
    })

    test('should show the create group modal', async ({ page }) => {
      expect(await homePageObject.isCreateGroupModalVisible(page)).toBeTruthy()
    })

    test('should close the create group modal when the close button is clicked', async ({ page }) => {
      await homePageObject.clickCloseCreateGroupModal(page)
      expect(await homePageObject.isCreateGroupModalVisible(page)).toBeFalsy()
    })

    test.describe('Possible error messages', () => {
      test.beforeEach(async ({ page }) => {
        homePageObject.setAlertErrorMessageListener(page)
      })
      test('should show an error message when the id is not filled', async ({ page }) => {
        await homePageObject.createGroup(page)
        console.log(homePageObject.errorMessage)
        expect(homePageObject.errorMessage).toBe('\nGroup id cannot be empty nor spaces.\n')
      })

      test('should show an error message when the id is filled with spaces', async ({ page }) => {
        await homePageObject.fillIdTextbox(page, '    ')
        await homePageObject.createGroup(page)
        expect(homePageObject.errorMessage).toBe('\nGroup id cannot be empty nor spaces.\n')
      })
    })

    test.describe('When a group has been created', () => {
      const id = '123'
      test.beforeEach(async ({ page }) => {
        homePageObject.cleanLocalStorage(page)
        await _createGroup(page, id)
        await homePageObject.goToHomePage(page)
      })
      test('should show the group id in the home page', async ({ page }) => {
        expect(await homePageObject.isGroupIdVisible(page, id)).toBeTruthy()
      })
      test('should delete a group when clicking the trash icon', async ({ page }) => {
        homePageObject.confirmDialog(page)
        expect(await homePageObject.isGroupIdVisible(page, id)).toBeTruthy()
        await homePageObject.clickDeleteIcon(page, id)
        expect(await homePageObject.isGroupIdVisible(page, id)).toBeFalsy()
      })
      const _createGroup = async (page: Page, id: string) => {
        await homePageObject.fillIdTextbox(page, id)
        await homePageObject.createGroup(page)
      }
    })
  })
})
