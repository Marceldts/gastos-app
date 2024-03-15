import { Group } from 'modules/group/domain/Group'
import { getGroupBalanceQuery } from 'modules/group/application/get/get-group-balance.query'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { User } from 'modules/user/domain/User'

describe('Get Group Balance', () => {
  const repository = groupRepositoryMock

  test('getGroupBalance should call the repository getGroupBalance method', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    const getGroupBalancePromise = getGroupBalanceQuery(repository).execute(group)
    expect(groupRepositoryMock.getGroupBalance).toHaveBeenCalledTimes(1)
    expect(getGroupBalancePromise).toBeInstanceOf(Promise<Map<User, number>>)
  })
})
