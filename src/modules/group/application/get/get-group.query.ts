import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Query } from 'shared/application/usecase/query'

/**
 * Gets a group
 * @param groupRepository The implementation of the group repository that will be used to get the group
 * @returns A promise that resolves to the group
 **/
export const getGroupQuery = (groupRepository: GroupRepository): Query<void, Group> => ({
  execute: async () => groupRepository.getGroup(),
})
