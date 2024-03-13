import { Group } from 'group/domain/Group'
import { GroupRepository } from 'group/domain/Group.repository'
import { User } from 'user/domain/User'

export const getGroupBalance = async (
  groupRepository: GroupRepository,
  group: Group,
): Promise<Map<User, number> | null> => {
  const groupBalance = await groupRepository.getGroupBalance(group)
  return groupBalance
}
