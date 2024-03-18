import { UserNameError, isUserNameValid } from './UserName'

export interface User {
  readonly id: number
  name: string
  balance: number
}

export const ensureIsUserValid = ({ name }: User): void => {
  const errors: Error[] = []
  if (!isUserNameValid(name)) errors.push(new UserNameError())
  if (errors.length > 0) throw new UserError(errors)
}

export class UserError extends AggregateError {
  constructor(errors: Error[]) {
    super(`The user is invalid.`)
    this.message = `\n${errors.map(error => error.message).join('')}`
  }
}

export const getNewUserId = (members: Set<User>) => {
  let id = Math.floor(Math.random() * 5000) + 1

  while (Array.from(members).some(user => user.id === id)) {
    id = Math.floor(Math.random() * 5000) + 1
  }

  return id
}
