import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'
import { User, isUserValid } from 'domain/user/User'

export const addMember = async (groupRepository: GroupRepository, group: Group, member: User): Promise<void> => {
  try {
    console.log('ADD MEMBER GROUP: ', group)
    if (isUserValid(member)) {
      groupRepository.addMember(group, member)
      await groupRepository.saveGroup(group)
    }
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
