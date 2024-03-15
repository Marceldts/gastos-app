import { saveGroupCommand } from 'modules/group/application/save/save-group.command'
import { Expense } from 'modules/expense/domain/Expense'
import { Group } from 'modules/group/domain/Group'
import { User } from 'modules/user/domain/User'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'

describe('saveGroup', () => {
  const repository = groupRepositoryMock

  it('setGroup use case should call the repository setGroup method when the group is valid', async () => {
    const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
    expect(async () => await saveGroupCommand(repository).execute(group)).not.toThrow()
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
    await expect(async () => await saveGroupCommand(repository).execute(invalidMockedGroup)).rejects.toThrow()
  })
})
