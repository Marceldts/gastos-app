import { User } from 'modules/user/domain/User'
import { Group } from 'modules/group/domain/Group'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { addMemberCommand } from 'modules/group/application/add/add-member.command'
import { GroupMother } from 'test/modules/group/domain/GroupMother'
import { UserMother } from 'test/modules/user/domain/UserMother'

describe('Add member', () => {
  const repository = groupRepositoryMock

  test('should add a member to the group', async () => {
    const group: Group = GroupMother.empty()
    const member: User = UserMother.valid()

    await addMemberCommand(repository).execute({ group, member })

    expect(repository.addMember).toHaveBeenCalledWith(group, member)
  })

  test('should not add a member to the group if it is not valid and throw an exception', async () => {
    const group: Group = GroupMother.empty()
    const member = UserMother.withInvalidName()

    await expect(async () => await addMemberCommand(repository).execute({ group, member })).rejects.toThrow()
  })
})
