import { User } from 'domain/user/User'

export interface Debt {
  debtor: User
  creditor: User
  amount: String
}

export const isDebtValid = (debt: Debt): boolean => {
  return debt.debtor !== debt.creditor && debt.amount !== ''
}
