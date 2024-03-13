import { Group, ensureIsGroupValid } from 'group/domain/Group'
import { GroupRepository } from 'group/domain/Group.repository'

export const saveGroup = async (groupRepository: GroupRepository, group: Group): Promise<void> => {
  ensureIsGroupValid(group)
  await groupRepository.saveGroup(group)
}
