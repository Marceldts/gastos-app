import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User } from 'modules/user/domain/User'
import { Query } from 'shared/application/usecase/query'

export const getGroupBalanceQuery = (groupRepository: GroupRepository): Query<Group, Map<User, number> | null> => ({
  execute: async group => {
    const groupBalance = await groupRepository.getGroupBalance(group)
    return groupBalance
  },
})
