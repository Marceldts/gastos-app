// hooks/useExpenseTableData.js
import { useEffect, useState } from 'react'
import { Group } from 'modules/group/domain/Group'
import { Expense } from 'modules/expense/domain/Expense'

export function useExpenseTableData(
  groupData: Group,
  setShowExpenseForm: (show: boolean) => void,
  setShowUserForm: (show: boolean) => void,
) {
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
        {
          text: 'Añadir gasto',
          onPress: () => {
            setShowExpenseForm(true)
          },
        },
        {
          text: 'Añadir miembro al grupo',
          onPress: () => setShowUserForm(true),
        },
      ],
    },
    body: [],
  })

  useEffect(() => {
    if (!groupData || !groupData.expenseList) return

    const expenseList = Array.from(groupData.expenseList)
    const updatedTableData = {
      ...tableData,
      body: expenseList
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((expense: Expense) => [expense.payerName, expense.description, expense.amount, expense.date]),
    }
    setTableData(updatedTableData)
  }, [groupData])

  return { tableData }
}
