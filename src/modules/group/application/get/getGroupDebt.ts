import { Debt } from 'modules/debt/domain/Debt'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'

export const getGroupDebt = async (groupRepository: GroupRepository, group: Group): Promise<Debt[]> => {
  const debts = await groupRepository.getGroupDebts(group)
  return debts
}
