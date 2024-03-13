import { Group, isGroupValid } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'

export const saveGroup = async (groupRepository: GroupRepository, group: Group): Promise<void> => {
  if (isGroupValid(group)) await groupRepository.saveGroup(group)
}
