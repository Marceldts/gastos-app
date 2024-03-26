import { Group, ensureIsGroupValid } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Command } from 'shared/application/usecase/command'

export const createGroupCommand = (groupRepository: GroupRepository): Command<Group, string> => ({
  execute: async (id: string) => {
    ensureIsGroupValid({ id, members: new Set(), expenseList: new Set() })
    return await groupRepository.createGroup(id)
  },
})
