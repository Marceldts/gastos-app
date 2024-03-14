import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User } from 'modules/user/domain/User'

export const getGroupBalance = async (
  groupRepository: GroupRepository,
  group: Group,
): Promise<Map<User, number> | null> => {
  const groupBalance = await groupRepository.getGroupBalance(group)
  return groupBalance
}
