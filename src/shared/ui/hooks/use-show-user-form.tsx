import { useState } from 'react'

export function useShowUserForm() {
  const [showUserForm, setShowUserForm] = useState(false)

  return { showUserForm, setShowUserForm }
}
