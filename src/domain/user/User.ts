import { isUserNameValid } from './UserName'

export interface User {
  readonly id: number
  name: string
  balance: number
}

export const ensureIsUserValid = ({ name }: User): void => {
  let errorMessage = ''
  if (!isUserNameValid(name)) errorMessage += 'Name is not valid.\n'
  if (errorMessage.length > 0) throw new Error('\n' + errorMessage)
}
