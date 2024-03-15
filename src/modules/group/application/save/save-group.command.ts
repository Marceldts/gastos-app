import { Group, ensureIsGroupValid } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Command } from 'shared/application/usecase/command'

export const saveGroupCommand = (groupRepository: GroupRepository): Command<void, Group> => ({
  execute: async (group: Group) => {
    ensureIsGroupValid(group)
    await groupRepository.saveGroup(group)
  },
})
