import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User, ensureIsUserValid } from 'modules/user/domain/User'
import { Command } from 'shared/application/usecase/command'

export const addMemberCommand = (groupRepository: GroupRepository): Command<void, { group: Group; member: User }> => ({
  execute: async ({ group, member }) => {
    ensureIsUserValid(member)
    groupRepository.addMember(group, member)
    await groupRepository.saveGroup(group)
  },
})
