import { isUserNameValid } from 'modules/user/domain/UserName'

export const isPayerNameValid = (payerName: string): boolean => {
  isUserNameValid(payerName)
  return true
}

export class ExpensePayerNameError extends Error {
  constructor() {
    super(`Payer name is not valid.\n`)
  }
}
