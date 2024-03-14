import { Debt } from 'modules/debt/domain/Debt'
import { Expense } from 'modules/expense/domain/Expense'
import { Group, ensureIsGroupValid } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User } from 'modules/user/domain/User'

export const localStorageGroupRepository: GroupRepository = {
  //We have to convert the Arrays to Sets because the Set object is not serializable, and thus, cannot be saved in localStorage.
  getGroup: async function (): Promise<Group | undefined> {
    const stringifiedGroup = localStorage.getItem('group')
    if (stringifiedGroup) {
      const parsedGroup = JSON.parse(stringifiedGroup)
      parsedGroup.members = new Set(parsedGroup.members)
      parsedGroup.expenseList = new Set(parsedGroup.expenseList)
      return parsedGroup
    } else {
      const emptyGroup: Group = {
        expenseList: new Set(),
        members: new Set(),
      }
      await this.saveGroup(emptyGroup)
      return emptyGroup
    }
  },
  //We have to convert the Sets to Arrays because the Set object is not serializable, and thus, cannot be saved in localStorage.
  saveGroup: async function (group: Group): Promise<void> {
    const groupToSave = {
      expenseList: Array.from(group.expenseList ?? []),
      members: Array.from(group.members ?? []),
    }
    localStorage.setItem('group', JSON.stringify(groupToSave))
  },
  /*
        TODO: Aplicar ley demeter
    */
  addExpense: async function (group: Group, expense: Expense): Promise<void> {
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

    this.saveGroup(group)
  },
  addMember: async function (group: Group, member: User): Promise<void> {
    group.members.add(member)
    await this.saveGroup(group)
  },
  getGroupBalance: async function ({ members }: Group): Promise<Map<User, number> | null> {
    if (!members) return null
    const groupBalance = new Map<User, number>()

    Array.from(members).forEach(member => {
      groupBalance.set(member, member.balance)
    })
    return groupBalance
  },
  getGroupDebts: async function ({ members }: Group): Promise<Debt[]> {
    const sortedUsers = Array.from(members).sort((a, b) => a.balance - b.balance)
    const debts: Debt[] = []

    while (sortedUsers.length > 1) {
      const debtor = sortedUsers[0] as User
      const creditor = sortedUsers[sortedUsers.length - 1] as User

      const amount = Math.min(Math.abs(debtor.balance), Math.abs(creditor.balance))
      const amountFixed = parseFloat(amount.toFixed(2))

      debtor.balance = parseFloat((debtor.balance + amount).toFixed(2))
      creditor.balance = parseFloat((creditor.balance - amount).toFixed(2))

      debts.push({
        debtor,
        creditor,
        amount: amountFixed.toString(),
      })

      if (debtor.balance === 0) sortedUsers.shift()
      if (creditor.balance === 0) sortedUsers.pop()
    }

    return debts
  },
}
