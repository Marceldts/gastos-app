import { saveGroupCommand } from 'modules/group/application/save/save-group.command'
import { Group } from 'modules/group/domain/Group'
import { User } from 'modules/user/domain/User'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { UserMother } from 'test/modules/user/domain/UserMother'
import { GroupMother } from 'test/modules/group/domain/GroupMother'

describe('saveGroup', () => {
  const repository = groupRepositoryMock

  it('setGroup use case should call the repository setGroup method when the group is valid', async () => {
    const group = GroupMother.valid()
    expect(async () => await saveGroupCommand(repository).execute(group)).not.toThrow()
  })

  it('setGroup use case should not call the repository setGroup method when the group is not valid', async () => {
    const invalidUser1: User = UserMother.withInvalidId()
    const invalidUser2: User = UserMother.withInvalidId()
    const invalidMockedGroup: Group = GroupMother.withMembers(new Set([invalidUser1, invalidUser2]))
    await expect(async () => await saveGroupCommand(repository).execute(invalidMockedGroup)).rejects.toThrow()
  })
})
