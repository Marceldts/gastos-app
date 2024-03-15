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

export const getNewUserId = (members: Set<User>) => {
  let id = Math.floor(Math.random() * 5000) + 1

  while (Array.from(members).some(user => user.id === id)) {
    id = Math.floor(Math.random() * 5000) + 1
  }

  return id
}
