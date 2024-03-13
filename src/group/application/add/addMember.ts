import { Group } from 'group/domain/Group'
import { GroupRepository } from 'group/domain/Group.repository'
import { User, ensureIsUserValid } from 'user/domain/User'

export const addMember = async (groupRepository: GroupRepository, group: Group, member: User): Promise<void> => {
  ensureIsUserValid(member)
  groupRepository.addMember(group, member)
  await groupRepository.saveGroup(group)
}
