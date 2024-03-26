import { Expense } from 'modules/expense/domain/Expense'
import { Group } from './Group'
import { User } from 'modules/user/domain/User'
import { Debt } from 'modules/debt/domain/Debt'

export interface GroupRepository {
  createGroup(id: string): Promise<Group>
  getGroup(id: string): Promise<Group>
  saveGroup(group: Group): Promise<void>
  addExpense(group: Group, expense: Expense): Promise<void>
  addMember(group: Group, member: User): Promise<void>
  getGroupDebts(group: Group): Promise<Debt[]>
  getGroupsIds(): Promise<string[]>
  deleteGroup(id: string): Promise<void>
}
