import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Query } from 'shared/application/usecase/query'

export const getGroupIdsQuery = (groupRepository: GroupRepository): Query<void, string[]> => ({
  execute: async () => {
    const groupIds = await groupRepository.getGroupsIds()
    return groupIds
  },
})
