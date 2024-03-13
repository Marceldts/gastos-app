import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'
import { User } from 'domain/user/User'

export const getGroupBalance = async (
  groupRepository: GroupRepository,
  group: Group,
): Promise<Map<User, number> | null> => {
  const groupBalance = await groupRepository.getGroupBalance(group)
  return groupBalance
}
