import { isUserNameValid } from './UserName'

export interface User {
  readonly id: number
  name: string
  balance: number
}

export const isUserValid = ({ name }: User): boolean => {
  let errorMessage = ''
  if (!isUserNameValid(name)) errorMessage += 'Name is not valid.\n'
  if (errorMessage.length > 0) throw new Error('\n' + errorMessage)
  return true
}
