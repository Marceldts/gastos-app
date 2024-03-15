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

/*
getGroupBalance: async function ({ members }: Group): Promise<Map<User, number> | null> {
    if (!members) return null
    const groupBalance = new Map<User, number>()

    Array.from(members).forEach(member => {
      groupBalance.set(member, member.balance)
    })
    return groupBalance
  },
*/

export const getGroupBalance = ({ members }: Group): Map<User, number> | null => {
  if (!members) return null
  const groupBalance = new Map<User, number>()

  Array.from(members).forEach(member => {
    groupBalance.set(member, member.balance)
  })
  return groupBalance
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
