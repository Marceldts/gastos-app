import { Expense } from 'modules/expense/domain/Expense'
import { User } from 'modules/user/domain/User'

export interface Group {
  expenseList: Set<Expense>
  members: Set<User>
}

export const ensureIsGroupValid = ({ members, expenseList }: Group): void => {
  let errorMessage = ''
  if (!_everyMemberHasUniqueIds(members)) errorMessage += 'Members list has duplicate ids.\n'
  if (_cannotHaveExpensesWithoutMembers({ members, expenseList }))
    errorMessage += 'Cannot have expenses without members.\n'
  if (errorMessage.length > 0) throw new Error('\n' + errorMessage)
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
