import { Debt } from 'modules/debt/domain/Debt'
import { Expense } from 'modules/expense/domain/Expense'
import { Group, addExpenseToGroup, addMemberToGroup } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User } from 'modules/user/domain/User'

//TODO: Add method to create a new group
//      It gets a param to specify the group id
//      It can also get a param to generate it with test data
//      It returns the group object
//      It saves the group in the storage
//      It throws an error if the group already exists
//      To manage the error, we'll show a message to the user with the possibility to navigate to the group, cancel the operation or clean that group's data
export const createStorageGroupRepository = (storage: Storage): GroupRepository => {
  return {
    //We have to convert the Arrays to Sets because the Set object is not serializable, and thus, cannot be saved in Storage.
    getGroup: async function (id: string): Promise<Group> {
      const stringifiedGroup = storage.getItem(`group ${id}`)
      if (stringifiedGroup) {
        const parsedGroup = JSON.parse(stringifiedGroup)
        parsedGroup.members = new Set(parsedGroup.members)
        parsedGroup.expenseList = new Set(parsedGroup.expenseList)
        return parsedGroup
      } else {
        const emptyGroup: Group = {
          id: `${id}`,
          expenseList: new Set(),
          members: new Set(),
        }
        await this.saveGroup(emptyGroup)
        return emptyGroup
      }
    },
    //We have to convert the Sets to Arrays because the Set object is not serializable, and thus, cannot be saved in Storage.
    saveGroup: async function (group: Group): Promise<void> {
      const groupToSave = {
        id: group.id ?? '1',
        expenseList: Array.from(group.expenseList ?? []),
        members: Array.from(group.members ?? []),
      }
      storage.setItem(`group ${group.id}`, JSON.stringify(groupToSave))
    },

    addExpense: async function (group: Group, expense: Expense): Promise<void> {
      addExpenseToGroup(group, expense)
      await this.saveGroup(group)
    },
    addMember: async function (group: Group, member: User): Promise<void> {
      addMemberToGroup(group, member)
      await this.saveGroup(group)
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
}
