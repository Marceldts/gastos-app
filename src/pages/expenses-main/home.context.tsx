import { createContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface ExpensesMainContextType {
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

  return (
    <ExpensesMainContext.Provider value={{ showExpenseForm, setShowExpenseForm, showUserForm, setShowUserForm }}>
      {children}
    </ExpensesMainContext.Provider>
  )
}

const defaultExpensesMainContext = {
  showExpenseForm: false,
  setShowExpenseForm: (value: boolean) => {},
  showUserForm: false,
  setShowUserForm: (value: boolean) => {},
}

export const ExpensesMainContext = createContext<ExpensesMainContextType>(defaultExpensesMainContext)
