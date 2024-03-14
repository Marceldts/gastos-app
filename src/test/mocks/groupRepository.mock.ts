import { Expense } from 'modules/expense/domain/Expense'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { User } from 'modules/user/domain/User'

export const groupRepositoryMock: GroupRepository = {
  getGroup: jest.fn().mockImplementation(() => {
    return {
      members: new Set<User>(),
      expenseList: new Set<Expense>(),
    }
  }),
  saveGroup: jest.fn(),
  addExpense: jest.fn(),
  addMember: jest.fn(),
  getGroupBalance: jest.fn(() =>
    Promise.resolve(
      new Map<User, number>([
        [{ name: 'test1', balance: 0, id: 1 }, 0],
        [{ name: 'test2', balance: 0, id: 1 }, 0],
      ]),
    ),
  ),
  getGroupDebts: jest.fn(),
}
