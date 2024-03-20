export const isAmountValid = (amount: number): boolean => {
  return amount > 0
}

export class ExpenseAmountError extends Error {
  constructor() {
    super(`Amount is not valid.\n`)
  }
}
