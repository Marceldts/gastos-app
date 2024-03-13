import { Debt } from 'debt/domain/Debt'
import { Group } from 'group/domain/Group'
import { GroupRepository } from 'group/domain/Group.repository'

export const getGroupDebt = async (groupRepository: GroupRepository, group: Group): Promise<Debt[]> => {
  const debts = await groupRepository.getGroupDebts(group)
  return debts
}
