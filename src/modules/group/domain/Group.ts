import { Expense } from 'modules/expense/domain/Expense'
import { User } from 'modules/user/domain/User'

export interface Group {
  readonly id: string
  expenseList: Set<Expense>
  members: Set<User>
}

export const ensureIsGroupValid = ({ id, members, expenseList }: Group): void => {
  const errors: Error[] = []
  if (_groupIdCannotBeEmptyNorSpaces(id)) errors.push(new GroupIdEmptyError())
  if (!_everyMemberHasUniqueIds(members)) errors.push(new GroupRepeatedIdError())
  if (_cannotHaveExpensesWithoutMembers({ id, members, expenseList }))
    errors.push(new GroupExpenseWithoutMembersError())

  if (errors.length > 0) throw new GroupError(errors)
}

export const getGroupBalance = ({ members }: Group): Map<User, number> | null => {
  if (!members) return null
  const groupBalance = new Map<User, number>()

  Array.from(members).forEach(member => {
    groupBalance.set(member, member.balance)
  })
  return groupBalance
}

export const addExpenseToGroup = (group: Group, expense: Expense): void => {
  group.expenseList.add(expense)
  let payerFound = false
  const totalReceivers = group.members.size
  const amountPerReceiver = expense.amount / totalReceivers
  const minAmountPerReceiver = 0.01

  if (amountPerReceiver < minAmountPerReceiver) throw new GroupInsuficientAmountError()

  group.members.forEach(user => {
    if (user.id === expense.payerId) {
      payerFound = true
      user.balance += expense.amount
    }
    user.balance -= amountPerReceiver
  })

  if (!payerFound) {
    throw new GroupPayerNotFoundError()
  }
}

export const addMemberToGroup = (group: Group, member: User): void => {
  group.members.add(member)
}

export class GroupError extends AggregateError {
  constructor(errors: Error[]) {
    super(`The group is invalid.`)
    this.message = `\n${errors.map(error => error.message).join('')}`
  }
}

export class GroupRepeatedIdError extends Error {
  constructor() {
    super(`Members list has duplicate ids.\n`)
  }
}

export class GroupExpenseWithoutMembersError extends Error {
  constructor() {
    super(`Cannot have expenses without members.\n`)
  }
}

export class GroupAlreadyExistsError extends Error {
  constructor() {
    super('Group already exists')
  }
}

export class GroupIdEmptyError extends Error {
  constructor() {
    super('Group id cannot be empty nor spaces.\n')
  }
}

export class GroupPayerNotFoundError extends Error {
  constructor() {
    super('No se encontró al pagador en el conjunto de usuarios.')
  }
}

export class GroupInsuficientAmountError extends Error {
  constructor() {
    super('La cantidad a pagar por cada miembro del grupo es insuficiente.')
  }
}

const _everyMemberHasUniqueIds = (members: Set<User>): boolean => {
  const userIdsSet = new Set<number>()

  for (const member of members) {
    if (userIdsSet.has(member.id)) return false
    userIdsSet.add(member.id)
  }

  return true
}

const _cannotHaveExpensesWithoutMembers = ({ members, expenseList }: Group): boolean => {
  return members.size === 0 && expenseList.size > 0
}

const _groupIdCannotBeEmptyNorSpaces = (id: string): boolean => {
  return id.trim().length === 0
}
