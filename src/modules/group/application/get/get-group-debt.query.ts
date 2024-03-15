import { Debt } from 'modules/debt/domain/Debt'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Query } from 'shared/application/usecase/query'

export const getGroupDebtQuery = (groupRepository: GroupRepository): Query<Group, Debt[]> => ({
  execute: async group => {
    const debts = await groupRepository.getGroupDebts(group)
    return debts
  },
})
