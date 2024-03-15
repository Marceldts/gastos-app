import { Group } from 'modules/group/domain/Group'
import { getGroupBalanceQuery } from 'modules/group/application/get/get-group-balance.query'
import { User } from 'modules/user/domain/User'
import { GroupMother } from 'modules/group/domain/GroupMother'

describe('Get Group Balance', () => {
  test('getGroupBalance should return an instance of "Promise<Map<user, number>>"', async () => {
    const group: Group = GroupMother.empty()
    const getGroupBalancePromise = getGroupBalanceQuery().execute(group)
    expect(getGroupBalancePromise).toBeInstanceOf(Promise<Map<User, number>>)
  })
})
