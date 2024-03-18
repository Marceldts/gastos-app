import '../../App.css'
import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { Group } from 'modules/group/domain/Group'
import { getGroupQuery } from 'modules/group/application/get/get-group.query'
import { localStorageGroupRepository } from 'modules/group/infrastructure/repositories/LocalStorageGroup.repository'
import { addExpenseCommand } from 'modules/expense/application/add/add-expense.command'
import { addMemberCommand } from 'modules/group/application/add/add-member.command'
import { User, getNewUserId } from 'modules/user/domain/User'
import { getGroupBalanceQuery } from 'modules/group/application/get/get-group-balance.query'
import { Debt } from 'modules/debt/domain/Debt'
import { DebtList } from 'modules/debt/ui/debts-list'
import { GroupBalance } from 'modules/group/ui/components/group-balance/group-balance'
import { AddUserForm } from 'modules/group/ui/components/add-user-form/add-user-form'
import { AddExpenseForm, ExpenseFormData } from 'modules/group/ui/components/add-expense-form/add-expense-form'
import { ExpenseTable } from 'modules/expense/ui/components/expense-table/expense-table'
import { useExpenseTableData } from 'modules/expense/ui/hooks/useExpenseTableData'
import { useInitializeGroup } from 'modules/group/ui/hooks/use-initialize-group'
import { ExpenseError } from 'modules/expense/domain/Expense'
import { ExpensesMainContext } from './expenses-main.context'

export const ExpensesMain = () => {
  const [groupData, setGroupData] = useState({} as Group)

  const { showUserForm, setShowUserForm, showExpenseForm, setShowExpenseForm } = useContext(ExpensesMainContext)
  const { tableData } = useExpenseTableData(groupData, setShowExpenseForm, setShowUserForm)
  const [balance, setBalance] = useState<Map<User, number> | null>(null)
  const [debts, setDebts] = useState([] as Debt[])

  useEffect(() => {
    getGroupBalanceQuery()
      .execute(groupData)
      .then(groupBalance => {
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
      await addExpenseCommand(localStorageGroupRepository).execute({ group: groupData, expense: expenseFormData })
      const updatedTableData = await getGroupQuery(localStorageGroupRepository).execute()
      setGroupData(updatedTableData!)
      setShowExpenseForm(false)
    } catch (error) {
      if (error instanceof ExpenseError) alert(error.message)
    }
  }

  const handleExpenseFormCancel = () => {
    setShowExpenseForm(false)
  }

  const handleUserFormSubmit = async (username: string) => {
    try {
      const newUser = { name: username, balance: 0, id: getNewUserId(groupData.members) }
      await addMemberCommand(localStorageGroupRepository).execute({ group: groupData, member: newUser })
      const updatedTableData = await getGroupQuery(localStorageGroupRepository).execute()
      setGroupData(updatedTableData!)
      setShowUserForm(false)
    } catch (error) {
      alert(error)
    }
  }

  const handleUserFormCancel = () => {
    setShowUserForm(false)
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
