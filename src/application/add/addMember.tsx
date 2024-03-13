import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'
import { User, isUserValid } from 'domain/user/User'

export const addMember = async (groupRepository: GroupRepository, group: Group, member: User): Promise<void> => {
  if (isUserValid(member)) {
    groupRepository.addMember(group, member)
    await groupRepository.saveGroup(group)
  }
}
