import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'

/**
 * Gets a group
 * @param groupRepository The implementation of the group repository that will be used to get the group
 * @returns A promise that resolves to the group
 **/
export const getGroup = async (groupRepository: GroupRepository): Promise<Group | undefined> => {
  return groupRepository.getGroup()
}
