import { today } from 'shared/datetime/datetime'

export const isDateValid = (date: string): boolean => {
  return dateIsNotAfterToday(date) && isISOString(date)
}

const dateIsNotAfterToday = (date: string): boolean => {
  return today >= date && date.length > 0
}

const isISOString = (dateString: string): boolean => {
  const isoFormatRegex = /^\d{4}-\d{2}-\d{2}$/
  return isoFormatRegex.test(dateString)
}

export class ExpenseDateError extends Error {
  constructor() {
    super(`Date is not valid.\n`)
  }
}
