import { createContext, useState } from 'react'

interface ExpensesMainContextType {
  showExpenseForm: boolean
  setShowExpenseForm: (value: boolean) => void
  showUserForm: boolean
  setShowUserForm: (value: boolean) => void
}

export const ExpensesMainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)

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
