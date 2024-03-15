import { User } from 'modules/user/domain/User'
import { Group } from './Group'
import { Expense } from 'modules/expense/domain/Expense'
import { ExpenseMother } from 'modules/expense/domain/ExpenseMother'
import { UserMother } from 'modules/user/domain/UserMother'

export class GroupMother {
  static empty(): Group {
    return {
      members: new Set(),
      expenseList: new Set(),
    }
  }
  static withMembers(members: Set<User>): Group {
    return {
      members,
      expenseList: new Set(),
    }
  }
  static withExpenses(expenseList: Set<Expense>): Group {
    return {
      members: new Set(),
      expenseList,
    }
  }
  static withMembersAndExpenses(members: Set<User>, expenseList: Set<Expense>): Group {
    return {
      members,
      expenseList,
    }
  }

  static valid(): Group {
    return {
      members: new Set([UserMother.validWithId(1), UserMother.validWithId(2)]),
      expenseList: new Set([ExpenseMother.validWithPayerId(1), ExpenseMother.validWithPayerId(2)]),
    }
  }

  static invalidWithDuplicatedMemberIds(): Group {
    return {
      members: new Set([UserMother.validWithId(1), UserMother.validWithId(1)]),
      expenseList: new Set(),
    }
  }

  static invalidWithExpensesWithoutMembers(): Group {
    return {
      members: new Set(),
      expenseList: new Set([ExpenseMother.validWithPayerId(1)]),
    }
  }
}
