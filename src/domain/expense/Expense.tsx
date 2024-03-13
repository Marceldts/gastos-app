import { isAmountValid } from './ExpenseAmount'
import { isDateValid } from './ExpenseDate'
import { isDescriptionValid } from './ExpenseDescription'
import { isPayerIdValid } from './ExpensePayerId'

export interface Expense {
  readonly payerId: number
  readonly payerName: string
  readonly amount: number
  description: string
  date: string
}

export const ensureIsExpenseValid = ({ payerId, amount, description, date }: Expense): void => {
  let errorMessage = ''
  if (!isPayerIdValid(payerId)) errorMessage += 'Payer id is not valid.\n'
  if (!isAmountValid(amount)) errorMessage += 'Amount is not valid.\n'
  if (!isDescriptionValid(description)) errorMessage += 'Description is not valid.\n'
  if (!isDateValid(date)) errorMessage += 'Date is not valid.\n'
  if (errorMessage.length > 0) throw new Error('\n' + errorMessage)
}
