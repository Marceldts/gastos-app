import { useState } from 'react'

export function useShowExpenseForm() {
  const [showExpenseForm, setShowExpenseForm] = useState(false)

  return { showExpenseForm, setShowExpenseForm }
}
