import { getGroupQuery } from 'modules/group/application/get/get-group.query'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'

describe('getGroup', () => {
  const repository = groupRepositoryMock

  test('getGroup should call the repository getGroup method method', async () => {
    await getGroupQuery(repository).execute()
    expect(groupRepositoryMock.getGroup).toHaveBeenCalledTimes(1)
  })
})
