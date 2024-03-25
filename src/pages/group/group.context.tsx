import { createContext, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

interface GroupPageContextType {
  readonly id: string
  showExpenseForm: boolean
  setShowExpenseForm: (value: boolean) => void
  showUserForm: boolean
  setShowUserForm: (value: boolean) => void
}

export const GroupPageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlParams] = useSearchParams()
  const showExpenseParam = urlParams.get('addExpense') === 'true'
  const showUserParam = urlParams.get('addUser') === 'true'
  const [showExpenseForm, setShowExpenseForm] = useState((!showUserParam && showExpenseParam) ?? false)
  const [showUserForm, setShowUserForm] = useState((!showExpenseParam && showUserParam) ?? false)
  const { id = '1' } = useParams()

  return (
    <GroupPageContext.Provider value={{ id, showExpenseForm, setShowExpenseForm, showUserForm, setShowUserForm }}>
      {children}
    </GroupPageContext.Provider>
  )
}

const defaultGroupPageContext = {
  id: '1',
  showExpenseForm: false,
  setShowExpenseForm: (_: boolean) => {},
  showUserForm: false,
  setShowUserForm: (_: boolean) => {},
}

export const GroupPageContext = createContext<GroupPageContextType>(defaultGroupPageContext)
