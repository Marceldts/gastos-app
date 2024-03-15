import '../../App.css'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Group } from 'modules/group/domain/Group'
import { getGroup } from 'modules/group/application/get/getGroup'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { localStorageGroupRepository } from 'modules/group/infrastructure/repositories/LocalStorageGroup.repository'
import { addExpense } from 'modules/expense/application/add/addExpense'
import { addMemberCommand } from 'modules/group/application/add/add-member.command'
import { User } from 'modules/user/domain/User'
import { getGroupBalance } from 'modules/group/application/get/getGroupBalance'
import { Debt } from 'modules/debt/domain/Debt'
import { DebtList } from 'modules/debt/ui/debts-list'
import { GroupBalance } from 'modules/group/ui/components/group-balance/group-balance'
import { AddUserForm } from 'modules/group/ui/components/add-user-form/add-user-form'
import { AddExpenseForm, ExpenseFormData } from 'modules/group/ui/components/add-expense-form/add-expense-form'
import { ExpenseTable } from 'modules/expense/ui/components/expense-table/expense-table'
import { useExpenseTableData } from 'modules/expense/ui/hooks/useExpenseTableData'
import { useShowUserForm } from 'shared/ui/hooks/use-show-user-form'
import { useShowExpenseForm } from 'shared/ui/hooks/use-show-expense-form'
import { useInitializeGroup } from 'modules/group/ui/hooks/use-initialize-group'

export const ExpensesMain = () => {
  const [groupData, setGroupData] = useState({} as Group)

  const { showUserForm, setShowUserForm } = useShowUserForm()
  const { showExpenseForm, setShowExpenseForm } = useShowExpenseForm()
  const { tableData } = useExpenseTableData(groupData, setShowExpenseForm, setShowUserForm)
  const [balance, setBalance] = useState<Map<User, number> | null>(null)
  const [debts, setDebts] = useState([] as Debt[])

  const repository: GroupRepository = localStorageGroupRepository

  useEffect(() => {
    getGroupBalance(repository, groupData).then(groupBalance => {
      setBalance(groupBalance)
    })
  }, [groupData])

  useEffect(() => {
    if (showExpenseForm) setShowUserForm(false)
  }, [showExpenseForm])

  useEffect(() => {
    if (showUserForm) setShowExpenseForm(false)
  }, [showUserForm])

  useInitializeGroup(setGroupData, setBalance, setShowExpenseForm)

  const handleExpenseFormSubmit = async (e: SyntheticEvent, expenseFormData: ExpenseFormData) => {
    try {
      e.preventDefault()
      await addExpense(localStorageGroupRepository, groupData, expenseFormData)
      const updatedTableData = await getGroup(localStorageGroupRepository)
      setGroupData(updatedTableData!)
      setShowExpenseForm(false)
    } catch (error) {
      alert(error)
    }
  }

  const handleExpenseFormCancel = () => {
    setShowExpenseForm(false)
  }

  const handleUserFormSubmit = async (username: string) => {
    try {
      const newUser = { name: username, balance: 0, id: _getNewUserId() }
      //Así llamaba antes al caso de uso
      // await addMember(localStorageGroupRepository, groupData, newUser)
      //Así llamo ahora al caso de uso
      await addMemberCommand(localStorageGroupRepository).execute({ group: groupData, member: newUser })
      const updatedTableData = await getGroup(localStorageGroupRepository)
      setGroupData(updatedTableData!)
      setShowUserForm(false)
    } catch (error) {
      alert(error)
    }
  }

  const handleUserFormCancel = () => {
    setShowUserForm(false)
  }

  const _getNewUserId = () => {
    let id = Math.floor(Math.random() * 5000) + 1

    while (Array.from(groupData.members).some(user => user.id === id)) {
      id = Math.floor(Math.random() * 5000) + 1
    }

    return id
  }

  return (
    <div className="App">
      <ExpenseTable tableData={tableData} setShowUserForm={setShowUserForm} setShowExpenseForm={setShowExpenseForm} />
      {(showExpenseForm || showUserForm) && (
        <section className="forms">
          {showExpenseForm && (
            <AddExpenseForm handleSubmitForm={handleExpenseFormSubmit} handleCancelForm={handleExpenseFormCancel} />
          )}
          {showUserForm && (
            <AddUserForm
              groupData={groupData}
              submitHandler={handleUserFormSubmit}
              cancelHandler={handleUserFormCancel}
              setShowUserForm={setShowUserForm}
            />
          )}
        </section>
      )}
      <GroupBalance balance={balance} />
      <DebtList debts={debts} />
    </div>
  )
}
