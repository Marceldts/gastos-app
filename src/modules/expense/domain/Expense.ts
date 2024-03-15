import { ExpenseAmountError, isAmountValid } from './ExpenseAmount'
import { ExpenseDateError, isDateValid } from './ExpenseDate'
import { ExpenseDescriptionError, isDescriptionValid } from './ExpenseDescription'
import { ExpensePayerIdError, isPayerIdValid } from './ExpensePayerId'

export interface Expense {
  readonly payerId: number
  readonly payerName: string
  readonly amount: number
  description: string
  date: string
}

export const ensureIsExpenseValid = ({ payerId, amount, description, date }: Expense): void => {
  const errors: Error[] = []
  if (!isPayerIdValid(payerId)) errors.push(new ExpensePayerIdError())
  if (!isAmountValid(amount)) errors.push(new ExpenseAmountError())
  if (!isDescriptionValid(description)) errors.push(new ExpenseDescriptionError())
  if (!isDateValid(date)) errors.push(new ExpenseDateError())
  if (errors.length > 0) throw new ExpenseError(errors)
}

export class ExpenseError extends AggregateError {
  constructor(errors: Error[]) {
    console.log(errors)
    super(`The expense is invalid.`)
    this.message = `\n${errors.map(error => error.message).join('')}`
    console.warn(this.message)
  }
}
