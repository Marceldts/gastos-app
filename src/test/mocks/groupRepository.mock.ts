import { Expense } from 'modules/expense/domain/Expense'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User } from 'modules/user/domain/User'

export const groupRepositoryMock: GroupRepository = {
  createGroup: jest.fn(),
  getGroup: jest.fn().mockImplementation(() => {
    return {
      members: new Set<User>(),
      expenseList: new Set<Expense>(),
    }
  }),
  saveGroup: jest.fn(),
  addExpense: jest.fn(),
  addMember: jest.fn(),
  getGroupDebts: jest.fn(),
  getGroupsIds: jest.fn(),
}
