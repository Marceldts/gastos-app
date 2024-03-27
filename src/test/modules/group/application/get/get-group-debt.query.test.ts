import { Group } from 'modules/group/domain/Group'
import { GroupMother } from '../../domain/GroupMother'
import { getGroupDebtQuery } from 'modules/group/application/get/get-group-debt.query'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { Debt } from 'modules/debt/domain/Debt'

describe('Get group debt query', () => {
  const repository = groupRepositoryMock
  test('getGroupDebtQuery should return an instance of "Promise<Debt[]>"', async () => {
    const group: Group = GroupMother.valid()
    const getGroupDebt = getGroupDebtQuery(repository).execute(group)

    expect(getGroupDebt).toBeInstanceOf(Promise<Debt[]>)
  })
})
