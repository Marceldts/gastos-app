import { Expense } from 'modules/expense/domain/Expense'
import { User } from 'modules/user/domain/User'

export interface Group {
  expenseList: Set<Expense>
  members: Set<User>
}

export const ensureIsGroupValid = ({ members, expenseList }: Group): void => {
  const errors: Error[] = []
  if (!_everyMemberHasUniqueIds(members)) errors.push(new GroupRepeatedIdError())
  if (_cannotHaveExpensesWithoutMembers({ members, expenseList })) errors.push(new GroupExpenseWithoutMembersError())

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

  group.members.forEach(user => {
    if (user.id === expense.payerId) {
      payerFound = true
      user.balance += expense.amount
    }
    user.balance -= amountPerReceiver
  })

  if (!payerFound) {
    throw new Error('No se encontró al pagador en el conjunto de usuarios.')
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
