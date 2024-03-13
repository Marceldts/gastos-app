import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'
import { User, ensureIsUserValid } from 'domain/user/User'

export const addMember = async (groupRepository: GroupRepository, group: Group, member: User): Promise<void> => {
  ensureIsUserValid(member)
  groupRepository.addMember(group, member)
  await groupRepository.saveGroup(group)
}
