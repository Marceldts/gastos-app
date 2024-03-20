import { createContext, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

interface ExpensesMainContextType {
  readonly id: string
  showExpenseForm: boolean
  setShowExpenseForm: (value: boolean) => void
  showUserForm: boolean
  setShowUserForm: (value: boolean) => void
}

export const ExpensesMainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlParams] = useSearchParams()
  const showExpenseParam = urlParams.get('addExpense') === 'true'
  const showUserParam = urlParams.get('addUser') === 'true'
  const [showExpenseForm, setShowExpenseForm] = useState(showExpenseParam ?? false)
  const [showUserForm, setShowUserForm] = useState((!showExpenseParam && showUserParam) ?? false)
  const { id = '1' } = useParams()

  return (
    <ExpensesMainContext.Provider value={{ id, showExpenseForm, setShowExpenseForm, showUserForm, setShowUserForm }}>
      {children}
    </ExpensesMainContext.Provider>
  )
}

const defaultExpensesMainContext = {
  id: '1',
  showExpenseForm: false,
  setShowExpenseForm: (value: boolean) => {},
  showUserForm: false,
  setShowUserForm: (value: boolean) => {},
}

export const ExpensesMainContext = createContext<ExpensesMainContextType>(defaultExpensesMainContext)
