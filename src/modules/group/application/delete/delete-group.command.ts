import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Command } from 'shared/application/usecase/command'

export const deleteGroupCommand = (groupRepository: GroupRepository): Command<void, string> => ({
  execute: async (groupId: string) => {
    await groupRepository.deleteGroup(groupId)
  },
})
