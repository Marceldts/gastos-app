import { getGroupQuery } from 'modules/group/application/get/get-group.query'
import { getGroupBalanceQuery } from 'modules/group/application/get/get-group-balance.query'
import { saveGroupCommand } from 'modules/group/application/save/save-group.command'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { createStorageGroupRepository } from 'modules/group/infrastructure/repositories/StorageGroup.repository'
import { User } from 'modules/user/domain/User'
import { useEffect } from 'react'

export const useInitializeGroup = function (
  setGroupData: (data: Group) => void,
  setBalance: (balance: Map<User, number> | null) => void,
  setShowExpenseForm: (show: boolean) => void,
) {
  const repository: GroupRepository = createStorageGroupRepository(localStorage)
  const testGroup: Group = {
    members: new Set([
      { name: 'Marcel', balance: 59.15, id: 1 },
      { name: 'Juan', balance: 22.55, id: 2 },
      { name: 'Pedro', balance: -40.85, id: 3 },
      { name: 'Sofia', balance: -40.85, id: 4 },
    ]),
    expenseList: new Set([
      {
        payerName: 'Marcel',
        payerId: 1,
        description: 'Burguers',
        amount: 100,
        date: '2023-09-01',
      },
      {
        payerName: 'Juan',
        payerId: 2,
        description: 'Pizza',
        amount: 10,
        date: '2024-01-02',
      },
      {
        payerName: 'Pedro',
        payerId: 3,
        description: 'Refrescos',
        amount: 53.4,
        date: '2020-09-03',
      },
    ]),
  }

  useEffect(() => {
    const _getGroupWhenInit = async () => {
      const group = await getGroupQuery(repository).execute()
      setBalance(await getGroupBalanceQuery().execute(group))
      setGroupData(group.expenseList.size === 0 && group.members.size === 0 ? testGroup : group)
      await saveGroupCommand(repository).execute(
        group.expenseList.size === 0 && group.members.size === 0 ? testGroup : group,
      )
      if (group.members.size === 0) {
        const updatedTableData = await getGroupQuery(repository).execute()
        setGroupData(updatedTableData!)
        setShowExpenseForm(false)
      }
    }
    _getGroupWhenInit()
  }, [])
}
