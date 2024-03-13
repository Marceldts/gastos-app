import { Group, ensureIsGroupValid } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'

export const saveGroup = async (groupRepository: GroupRepository, group: Group): Promise<void> => {
  ensureIsGroupValid(group)
  await groupRepository.saveGroup(group)
}
