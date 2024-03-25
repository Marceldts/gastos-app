import '../../App.css'
import { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { Group } from 'modules/group/domain/Group'
import { getGroupQuery } from 'modules/group/application/get/get-group.query'
import { createStorageGroupRepository } from 'modules/group/infrastructure/repositories/StorageGroup.repository'
import { addExpenseCommand } from 'modules/expense/application/add/add-expense.command'
import { addMemberCommand } from 'modules/group/application/add/add-member.command'
import { User, UserError, getNewUserId } from 'modules/user/domain/User'
import { getGroupBalanceQuery } from 'modules/group/application/get/get-group-balance.query'
import { Debt } from 'modules/debt/domain/Debt'
import { DebtList } from 'modules/debt/ui/components/debts-list'
import { GroupBalance } from 'modules/group/ui/components/group-balance/group-balance'
import { AddUserForm } from 'modules/group/ui/components/add-user-form/add-user-form'
import { AddExpenseForm, ExpenseFormData } from 'modules/group/ui/components/add-expense-form/add-expense-form'
import { ExpenseTable } from 'modules/expense/ui/components/expense-table/expense-table'
import { useExpenseTableData } from 'modules/expense/ui/hooks/useExpenseTableData'
import { useInitializeGroup } from 'modules/group/ui/hooks/use-initialize-group'
import { ExpenseError } from 'modules/expense/domain/Expense'
import { ExpensesMainContext } from './group.context'
import { useSearchParams } from 'react-router-dom'
import { EmptyGroup } from 'modules/group/ui/components/empty-group/empty-group'
import { getGroupDebtQuery } from 'modules/group/application/get/get-group-debt.query'
import { HomeButton } from 'shared/ui/components/00_atoms/home-button/home-button'

export const GroupPage = () => {
  const [groupData, setGroupData] = useState({} as Group)
  const [debts, setDebts] = useState([] as Debt[])

  const { id, showUserForm, setShowUserForm, showExpenseForm, setShowExpenseForm } = useContext(ExpensesMainContext)
  const { tableData } = useExpenseTableData(groupData, setShowExpenseForm, setShowUserForm)
  const [balance, setBalance] = useState<Map<User, number> | null>(null)

  const [params, setParams] = useSearchParams()

  const repository = createStorageGroupRepository(localStorage)
  const thereAreMembers = groupData.members && typeof groupData.members !== 'undefined' && groupData.members.size > 0

  useEffect(() => {
    getGroupBalanceQuery()
      .execute(groupData)
      .then(groupBalance => {
        setBalance(groupBalance)
      })
  }, [groupData])

  useEffect(() => {
    const _getGroupAndGetDebts = async () => {
      const updatedTableData = await getGroupQuery(repository).execute(id)
      getGroupDebts(updatedTableData)
    }
    if (!balance) return
    _getGroupAndGetDebts()
  }, [balance])

  useEffect(() => {
    if (showExpenseForm) {
      setShowUserForm(false)
    }
    _setFormsParams()
  }, [showExpenseForm, thereAreMembers])

  useEffect(() => {
    if (showUserForm) {
      setShowExpenseForm(false)
    }
    _setFormsParams()
  }, [showUserForm])

  useInitializeGroup(setGroupData, setBalance)

  const getGroupDebts = async (groupToGetDebts: Group) => {
    const debts = await getGroupDebtQuery(repository).execute(groupToGetDebts)
    setDebts(debts)
  }

  const handleExpenseFormSubmit = async (e: SyntheticEvent, expenseFormData: ExpenseFormData) => {
    try {
      e.preventDefault()
      await addExpenseCommand(repository).execute({ group: groupData, expense: expenseFormData })
      const updatedTableData = await getGroupQuery(repository).execute(id)
      setGroupData(updatedTableData!)
      setShowExpenseForm(false)
    } catch (error) {
      if (error instanceof ExpenseError) alert(error.message)
    }
  }

  const handleExpenseFormCancel = (e: SyntheticEvent) => {
    e.preventDefault()
    setShowExpenseForm(false)
  }

  const handleUserFormSubmit = async (e: SyntheticEvent, username: string) => {
    try {
      e.preventDefault()
      const newUser = { name: username, balance: 0, id: getNewUserId(groupData.members) }
      await addMemberCommand(repository).execute({ group: groupData, member: newUser })
      const updatedTableData = await getGroupQuery(repository).execute(id)
      setGroupData(updatedTableData!)
      setShowUserForm(false)
    } catch (error) {
      if (error instanceof UserError) alert(error.message)
    }
  }

  const handleUserFormCancel = (e: SyntheticEvent) => {
    e.preventDefault()
    setShowUserForm(false)
  }

  const _setFormsParams = () => {
    if (showExpenseForm) {
      setParams('addExpense=true')
      return
    }
    if (showUserForm) {
      setParams('addUser=true')
      return
    }
    setParams('')
  }

  return (
    <>
      <HomeButton />
      <main className="group">
        <ExpenseTable tableData={tableData} setShowUserForm={setShowUserForm} setShowExpenseForm={setShowExpenseForm} />
        {(showExpenseForm || showUserForm) && (
          <section className="forms">
            {showExpenseForm && thereAreMembers && (
              <AddExpenseForm
                members={groupData.members}
                handleSubmitForm={handleExpenseFormSubmit}
                handleCancelForm={handleExpenseFormCancel}
              />
            )}
            {showExpenseForm && !thereAreMembers && <EmptyGroup handleCancelForm={handleExpenseFormCancel} />}
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
      </main>
    </>
  )
}
