import { Expense } from 'modules/expense/domain/Expense'
import { User } from 'modules/user/domain/User'

export interface Group {
  expenseList: Set<Expense>
  members: Set<User>
}

export const ensureIsGroupValid = ({ members, expenseList }: Group): void => {
  let errorMessage = ''
  if (!everyMemberHasUniqueIds(members)) errorMessage += 'Members list has duplicate ids.\n'
  if (cannotHaveExpensesWithoutMembers({ members, expenseList }))
    errorMessage += 'Cannot have expenses without members.\n'
  if (errorMessage.length > 0) throw new Error('\n' + errorMessage)
}

const everyMemberHasUniqueIds = (members: Set<User>): boolean => {
  const userIdsSet = new Set<number>()

  for (const member of members) {
    if (userIdsSet.has(member.id)) return false
    userIdsSet.add(member.id)
  }

  return true
}

const cannotHaveExpensesWithoutMembers = ({ members, expenseList }: Group): boolean => {
  return members.size === 0 && expenseList.size > 0
}
