import { User } from 'modules/user/domain/User'
import { Group } from 'modules/group/domain/Group'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { addMemberCommand } from 'modules/group/application/add/add-member.command'

describe('Add member', () => {
  const repository = groupRepositoryMock

  test('should add a member to the group', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    const member: User = { name: 'Test user', balance: 0, id: 1 }

    await addMemberCommand(repository).execute({ group, member })

    expect(repository.addMember).toHaveBeenCalledWith(group, member)
  })

  test('should not add a member to the group if it is not valid and throw an exception', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    const member = { name: '', balance: 0, id: 1 }

    await expect(async () => await addMemberCommand(repository).execute({ group, member })).rejects.toThrow()
  })
})
