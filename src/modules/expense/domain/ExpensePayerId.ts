export const isPayerIdValid = (payerId: number): boolean => {
  return payerId >= 1
}

export class ExpensePayerIdError extends Error {
  constructor() {
    super(`Payer id is not valid.\n`)
  }
}
