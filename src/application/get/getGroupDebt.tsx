import { Debt } from 'domain/debt/Debt'
import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'

export const getGroupDebt = async (groupRepository: GroupRepository, group: Group): Promise<Debt[]> => {
  const debts = await groupRepository.getGroupDebts(group)
  return debts
}
