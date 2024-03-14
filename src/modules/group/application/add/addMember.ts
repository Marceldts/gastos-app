import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User, ensureIsUserValid } from 'modules/user/domain/User'

export const addMember = async (groupRepository: GroupRepository, group: Group, member: User): Promise<void> => {
  ensureIsUserValid(member)
  groupRepository.addMember(group, member)
  await groupRepository.saveGroup(group)
}
