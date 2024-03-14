import { CustomTable } from 'shared/ui/components/03_templates/table/CustomTable'
import { SyntheticEvent, useEffect, useState } from 'react'
import { Group } from 'modules/group/domain/Group'
import { getGroup } from 'modules/group/application/get/getGroup'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { localStorageGroupRepository } from 'modules/group/infrastructure/repositories/LocalStorageGroup.repository'
import './App.css'
import { addExpense } from 'modules/expense/application/add/addExpense'
import { addMember } from 'modules/group/application/add/addMember'
import { getGroupDebt } from 'modules/group/application/get/getGroupDebt'
import { User } from 'modules/user/domain/User'
import { getGroupBalance } from 'modules/group/application/get/getGroupBalance'
import { saveGroup } from 'modules/group/application/save/saveGroup'
import { Debt } from 'modules/debt/domain/Debt'
import { Expense } from 'modules/expense/domain/Expense'
import { DebtList } from 'modules/debt/ui/debts-list'
import { GroupBalance } from 'modules/group/ui/group-balance'
import { AddUserForm } from 'modules/group/ui/add-user-form'
import { AddExpenseForm, ExpenseFormData } from 'modules/group/ui/add-expense-form'

function App() {
  const [groupData, setGroupData] = useState({} as Group)
  const [tableData, setTableData] = useState<{
    header: {
      text: string
      buttons: { text: string; onPress: () => void }[]
    }
    body: (string | number)[][]
  }>({
    header: {
      text: 'Gastos',
      buttons: [
        { text: 'Añadir gasto', onPress: () => setShowExpenseForm(true) },
        {
          text: 'Añadir miembro al grupo',
          onPress: () => setShowUserForm(true),
        },
      ],
    },
    body: [],
  })
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  const [showUserForm, setShowUserForm] = useState(false)

  const [balance, setBalance] = useState<Map<User, number> | null>(null)
  const [debts, setDebts] = useState([] as Debt[])

  //TODO: Mover datos mockeados a otra capa infra
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

  const repository: GroupRepository = localStorageGroupRepository

  useEffect(() => {
    const getGroupWhenInit = async (repository: GroupRepository) => {
      const group = await getGroup(repository)
      setBalance(await getGroupBalance(localStorageGroupRepository, group!))
      setGroupData(group?.expenseList?.size == 0 && group.members.size == 0 ? testGroup : group!)
      await saveGroup(repository, group?.expenseList?.size == 0 && group.members.size == 0 ? testGroup : group!)
      return group
    }

    getGroupWhenInit(repository).then(async group => {
      if (group?.members?.size === 0) {
        const updatedTableData = await getGroup(localStorageGroupRepository)
        setGroupData(updatedTableData!)
        setShowExpenseForm(false)
      }
    })
  }, [])

  useEffect(() => {
    if (!groupData) return
    if (groupData.expenseList?.size !== 0) {
      const expenseList = Array.from(groupData.expenseList ?? [])
      const updatedTableData = {
        ...tableData,
        body: expenseList
          .sort((a, b) => b.date.localeCompare(a.date))
          .map(expense => [expense.payerName, expense.description, expense.amount, expense.date]),
      }
      setTableData(updatedTableData)
      getGroupBalance(repository, groupData).then(groupBalance => {
        setBalance(groupBalance)
        //TODO: Corregir el error que se produce al intentar obtener las deudas (sobreescribe el balance y lo setea a 0)
        // if (!groupData.members && !debts) getGroupDebt(repository, groupData).then((debts: Debt[]) => {
        //   setDebts(debts);
        // });
      })
    }
  }, [groupData])

  useEffect(() => {
    if (showExpenseForm) setShowUserForm(false)
  }, [showExpenseForm])

  useEffect(() => {
    if (showUserForm) setShowExpenseForm(false)
  }, [showUserForm])

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
      const newUser = { name: username, balance: 0, id: getNewUserId() }
      await addMember(localStorageGroupRepository, groupData, newUser)
      const updatedTableData = await getGroup(localStorageGroupRepository)
      setGroupData(updatedTableData!)
      setShowUserForm(false)
    } catch (error) {
      alert(error)
    }
  }

  const getNewUserId = () => {
    let id = Math.floor(Math.random() * 5000) + 1

    while (Array.from(groupData.members).some(user => user.id === id)) {
      id = Math.floor(Math.random() * 5000) + 1
    }

    return id
  }

  const handleUserFormCancel = () => {
    setShowUserForm(false)
  }

  return (
    <div className="App">
      {!!tableData && <CustomTable className="group-table" data={tableData} />}
      {tableData.body.length === 0 && <p>No hay gastos</p>}
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

export default App

// shared
//   application
//     usecase
//       usecase.ts
//       query.ts
//       command.ts
//   ui/
//     components/
//       ->
//   datetime/
//     datetime.ts
//   currency
//     currency-formatter.ts
