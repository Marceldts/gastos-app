import { Group } from 'modules/group/domain/Group'
import { getGroupBalanceQuery } from 'modules/group/application/get/get-group-balance.query'
import { User } from 'modules/user/domain/User'

describe('Get Group Balance', () => {
  test('getGroupBalance should return an instance of "Promise<Map<user, number>>"', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    const getGroupBalancePromise = getGroupBalanceQuery().execute(group)
    expect(getGroupBalancePromise).toBeInstanceOf(Promise<Map<User, number>>)
  })
})
