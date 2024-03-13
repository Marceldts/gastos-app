import { saveGroup } from 'application/save/saveGroup'
import { Expense } from 'domain/expense/Expense'
import { Group } from 'domain/group/Group'
import { User } from 'domain/user/User'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'

describe('saveGroup', () => {
  const repository = groupRepositoryMock

  it('setGroup use case should call the repository setGroup method when the group is valid', async () => {
    const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
    expect(async () => await saveGroup(repository, group)).not.toThrow()
  })

  it('setGroup use case should not call the repository setGroup method when the group is not valid', async () => {
    const invalidUser1: User = {
      id: 1,
      name: 'Test user 1',
      balance: 0,
    }
    const invalidUser2: User = {
      id: 1,
      name: 'Test user 2',
      balance: 0,
    }
    const invalidMockedGroup: Group = {
      expenseList: new Set(),
      members: new Set([invalidUser1, invalidUser2]),
    }
    expect(async () => await saveGroup(repository, invalidMockedGroup)).rejects.toThrow()
  })
})
