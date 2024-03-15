import { ExpenseMother } from 'modules/expense/domain/ExpenseMother'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { GroupMother } from 'test/modules/group/domain/GroupMother'
import { localStorageGroupRepository } from 'modules/group/infrastructure/repositories/LocalStorageGroup.repository'
import { UserMother } from 'test/modules/user/domain/UserMother'

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
      const emptyGroup = GroupMother.empty()
      const group = await repository.getGroup()
      expect(group).toEqual(emptyGroup)
    })

    test('getGroup should return the group from local storage if there is one', async () => {
      const mockedSerializedGroup = {
        members: [],
        expenseList: [],
      }
      const mockedGroup = GroupMother.empty()
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
      const groupToSave: Group = GroupMother.valid()

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

      await expect(repository.saveGroup(GroupMother.empty())).rejects.toThrow(mockedError)
    })
  })

  describe('addExpense', () => {
    let saveGroupMock: jest.SpyInstance

    beforeAll(() => {
      saveGroupMock = jest.spyOn(localStorageGroupRepository, 'saveGroup')
    })

    test('addExpense should add the expense to the group and save it', async () => {
      const user = UserMother.validWithIdAndBalance(1, 0)
      const group: Group = GroupMother.withMembers(new Set([user]))
      const expense = ExpenseMother.validWithPayerIdAndAmount(1, 100)

      saveGroupMock.mockResolvedValueOnce(() => {})

      await localStorageGroupRepository.addExpense(group, expense)

      expect(group.expenseList.has(expense)).toBeTruthy()
      expect(saveGroupMock).toHaveBeenCalledWith(group)
    })

    test('addExpense should reject the promise on error', async () => {
      saveGroupMock.mockImplementationOnce(() => {
        throw mockedError
      })

      const group: Group = GroupMother.empty()
      const expense = ExpenseMother.validWithPayerIdAndAmount(1, 100)

      await expect(localStorageGroupRepository.addExpense(group, expense)).rejects.toThrow(mockedError)
    })
  })

  describe('addMember', () => {
    let saveGroupMock: jest.SpyInstance

    beforeAll(() => {
      saveGroupMock = jest.spyOn(localStorageGroupRepository, 'saveGroup')
    })

    test('addMember should add the member to the group and save it', async () => {
      const group: Group = GroupMother.empty()
      const member = UserMother.validWithId(100)

      saveGroupMock.mockResolvedValueOnce(() => {})

      await localStorageGroupRepository.addMember(group, member)

      expect(group.members.has(member)).toBeTruthy()
      expect(saveGroupMock).toHaveBeenCalledWith(group)
    })

    test('addMember should reject the promise on error', async () => {
      saveGroupMock.mockImplementationOnce(() => {
        throw mockedError
      })

      const group: Group = GroupMother.empty()
      const member = UserMother.validWithId(100)

      await expect(localStorageGroupRepository.addMember(group, member)).rejects.toThrow(mockedError)
    })
  })
})
