import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'

export const getGroupBalance = async (groupRepository: GroupRepository, group: Group) => {
  try {
    console.log('GET GROUP BALANCE GROUP: ', group)
    const groupBalance = await groupRepository.getGroupBalance(group)
    return Promise.resolve(groupBalance)
  } catch (error) {
    return Promise.reject(error)
  }
}
