import { User } from 'modules/user/domain/User'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { localStorageGroupRepository } from 'modules/group/infrastructure/repositories/LocalStorageGroup.repository'

describe('local storage group repository implementation', () => {
  let repository: GroupRepository
  const mockedError = new Error('No se encontró al pagador en el conjunto de usuarios.')

  beforeAll(() => {
    repository = localStorageGroupRepository
  })

  describe('getGroup', () => {
    let getItemMock: jest.SpyInstance

    beforeAll(() => {
      getItemMock = jest.spyOn(Storage.prototype, 'getItem')
    })

    test('getGroup should return an empty group if there is no group in local storage', async () => {
      getItemMock.mockReturnValueOnce(JSON.stringify(undefined))
      repository = localStorageGroupRepository
      const group = await repository.getGroup()
      expect(group).toEqual({
        members: new Set(),
        expenseList: new Set(),
      })
    })

    test('getGroup should return the group from local storage if there is one', async () => {
      const mockedSerializedGroup = {
        members: [],
        expenseList: [],
      }
      const mockedGroup = {
        members: new Set(),
        expenseList: new Set(),
      }
      getItemMock.mockReturnValueOnce(JSON.stringify(mockedSerializedGroup))
      repository = localStorageGroupRepository
      const group = await repository.getGroup()
      expect(group).toEqual(mockedGroup)
    })

    test('getGroup should reject the promise on error', async () => {
      getItemMock.mockImplementationOnce(() => {
        throw mockedError
      })

      repository = localStorageGroupRepository

      await expect(repository.getGroup()).rejects.toThrow(mockedError)
    })
  })

  describe('saveGroup', () => {
    let setItemMock: jest.SpyInstance

    beforeAll(() => {
      setItemMock = jest.spyOn(Storage.prototype, 'setItem')
    })

    test('saveGroup should save the group in local storage', async () => {
      const groupToSave: Group = {
        expenseList: new Set([
          {
            payerId: 1,
            payerName: 'Test',
            amount: 100,
            description: 'Test expense',
            date: '2022-01-28',
          },
        ]),
        members: new Set([{ name: 'Test user', balance: 0, id: 1 }]),
      }

      const repository = localStorageGroupRepository

      await repository.saveGroup(groupToSave)

      expect(setItemMock).toHaveBeenCalledWith(
        'group',
        JSON.stringify({
          expenseList: Array.from(groupToSave.expenseList),
          members: Array.from(groupToSave.members),
        }),
      )
    })

    test('saveGroup should reject the promise on error', async () => {
      setItemMock.mockImplementationOnce(() => {
        throw mockedError
      })

      repository = localStorageGroupRepository

      await expect(
        repository.saveGroup({
          expenseList: new Set(),
          members: new Set(),
        }),
      ).rejects.toThrow(mockedError)
    })
  })

  describe('addExpense', () => {
    let saveGroupMock: jest.SpyInstance

    beforeAll(() => {
      saveGroupMock = jest.spyOn(localStorageGroupRepository, 'saveGroup')
    })

    test('addExpense should add the expense to the group and save it', async () => {
      const group: Group = {
        expenseList: new Set(),
        members: new Set([{ name: 'Test user', balance: 0, id: 1 }]),
      }
      const expense = {
        payerId: 1,
        payerName: 'Test',
        amount: 100,
        description: 'Test expense',
        date: '2022-01-28',
      }

      saveGroupMock.mockResolvedValueOnce(() => {})

      await localStorageGroupRepository.addExpense(group, expense)

      expect(group.expenseList.has(expense)).toBeTruthy()
      expect(saveGroupMock).toHaveBeenCalledWith(group)
    })

    test('addExpense should reject the promise on error', async () => {
      saveGroupMock.mockImplementationOnce(() => {
        throw mockedError
      })

      await expect(
        localStorageGroupRepository.addExpense(
          {
            expenseList: new Set(),
            members: new Set(),
          },
          {
            payerId: 1,
            payerName: 'Test',
            amount: 100,
            description: 'Test expense',
            date: '2022-01-28',
          },
        ),
      ).rejects.toThrow(mockedError)
    })
  })

  describe('addMember', () => {
    let saveGroupMock: jest.SpyInstance

    beforeAll(() => {
      saveGroupMock = jest.spyOn(localStorageGroupRepository, 'saveGroup')
    })

    test('addMember should add the member to the group and save it', async () => {
      const group: Group = {
        expenseList: new Set(),
        members: new Set(),
      }
      const member = { name: 'Test user', balance: 0, id: 1 }

      saveGroupMock.mockResolvedValueOnce(() => {})

      await localStorageGroupRepository.addMember(group, member)

      expect(group.members.has(member)).toBeTruthy()
      expect(saveGroupMock).toHaveBeenCalledWith(group)
    })

    test('addMember should reject the promise on error', async () => {
      saveGroupMock.mockImplementationOnce(() => {
        throw mockedError
      })

      await expect(
        localStorageGroupRepository.addMember(
          {
            expenseList: new Set(),
            members: new Set(),
          },
          { name: 'Test user', balance: 0, id: 1 },
        ),
      ).rejects.toThrow(mockedError)
    })
  })
})
