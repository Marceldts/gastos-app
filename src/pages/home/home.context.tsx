import { createContext, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

interface HomePageContextType {
  readonly showCreateGroup: boolean
  setShowCreateGroup: (value: boolean) => void
}

export const HomePageContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [urlParams] = useSearchParams()
  const createGroupParam = urlParams.get('createGroup') === 'true'

  const [showCreateGroup, setShowCreateGroup] = useState(createGroupParam)

  return <HomePageContext.Provider value={{ showCreateGroup, setShowCreateGroup }}>{children}</HomePageContext.Provider>
}

const defaultGroupPageContext = {
  showCreateGroup: false,
  setShowCreateGroup: (_: boolean) => {},
}

export const HomePageContext = createContext<HomePageContextType>(defaultGroupPageContext)
