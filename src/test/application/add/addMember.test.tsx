import { User } from 'domain/user/User'
import { Group } from 'domain/group/Group'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { addMember } from 'application/add/addMember'

describe('Add member', () => {
  const repository = groupRepositoryMock
  // const ensureIsUserValid: jest.SpyInstance = jest.spyOn(require('domain/user/User'), 'ensureIsUserValid')

  test('should add a member to the group', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    const member: User = { name: 'Test user', balance: 0, id: 1 }

    await addMember(repository, group, member)

    expect(repository.addMember).toHaveBeenCalledWith(group, member)
  })

  test('should not add a member to the group if it is not valid and throw an exception', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    const member = { name: '', balance: 0, id: 1 }

    expect(async () => await addMember(repository, group, member)).rejects.toThrow()
  })
})
