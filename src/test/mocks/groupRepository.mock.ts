import { Expense } from "@domain/expense/Expense";
import { GroupRepository } from "@domain/group/Group.repository";
import { User } from "@domain/user/User";

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
  getGroupBalance: jest.fn(),
};
