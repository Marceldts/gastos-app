import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { GroupMother } from '../../domain/GroupMother'
import { getGroupIdsQuery } from 'modules/group/application/get/get-group-ids.query'

describe('Get group ids query', () => {
  test('should return group ids', async () => {
    const groupRepository = groupRepositoryMock
    const group = GroupMother.valid()
    const expectedGroupIds = [group.id]

    jest.spyOn(groupRepository, 'getGroupsIds').mockResolvedValue(expectedGroupIds)

    const getGroupIdsQueryResult = getGroupIdsQuery(groupRepository).execute()

    await expect(getGroupIdsQueryResult).resolves.toEqual(expectedGroupIds)
  })
})
