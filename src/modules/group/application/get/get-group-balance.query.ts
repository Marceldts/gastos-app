import { Group, getGroupBalance } from 'modules/group/domain/Group'
import { User } from 'modules/user/domain/User'
import { Query } from 'shared/application/usecase/query'

export const getGroupBalanceQuery = (): Query<Group, Map<User, number> | null> => ({
  execute: async group => {
    const groupBalance = getGroupBalance(group)
    return groupBalance
  },
})
