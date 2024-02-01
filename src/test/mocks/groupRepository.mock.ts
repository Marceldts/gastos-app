import { Expense } from "domain/expense/Expense";
import { GroupRepository } from "domain/group/Group.repository";
import { User } from "domain/user/User";

export const groupRepositoryMock: GroupRepository = {
  getGroup: jest.fn().mockImplementation(() => {
    return {
      members: new Set<User>(),
      expenseList: new Set<Expense>(),
    };
  }),
  saveGroup: jest.fn(),
  addExpense: jest.fn(),
  addMember: jest.fn(),
  getGroupBalance: jest.fn(() =>
    Promise.resolve(
      new Map<User, number>([
        [{ name: "test1", balance: 0, id: 1 }, 0],
        [{ name: "test2", balance: 0, id: 1 }, 0],
      ])
    )
  ),
};
