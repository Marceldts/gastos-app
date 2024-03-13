import { saveGroup } from 'application/save/saveGroup'
import { Expense } from 'domain/expense/Expense'
import { User } from 'domain/user/User'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'

describe('saveGroup', () => {
  const repository = groupRepositoryMock
  const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
  const isGroupValid: jest.SpyInstance = jest.spyOn(require('domain/group/Group'), 'isGroupValid')

  it('setGroup use case should call the repository setGroup method when the group is valid', async () => {
    isGroupValid.mockReturnValueOnce(true)
    await saveGroup(repository, group)
    expect(isGroupValid).toHaveBeenCalledWith(group)
    expect(repository.saveGroup).toHaveBeenCalledWith(group)
  })

  it('setGroup use case should not call the repository setGroup method when the group is not valid', async () => {
    isGroupValid.mockReturnValueOnce(false)
    await saveGroup(repository, group)
    expect(isGroupValid).toHaveBeenCalledWith(group)
    expect(repository.saveGroup).not.toHaveBeenCalled()
  })
})
