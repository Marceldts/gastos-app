import { Expense } from 'domain/expense/Expense'
import { User } from 'domain/user/User'
import { addExpense } from 'application/add/addExpense'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'

describe('Add Expense', () => {
  const repository = groupRepositoryMock
  const isExpenseValid: jest.SpyInstance = jest.spyOn(require('domain/expense/Expense'), 'isExpenseValid')

  test('should add an expense to the group', () => {
    const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
    const validMockedExpense: Expense = {
      payerId: 1,
      payerName: 'Test user',
      amount: 100,
      description: 'Test expense',
      date: '2022-01-28',
    }

    isExpenseValid.mockReturnValue(true)

    const addExpensePromise = addExpense(repository, group, validMockedExpense)

    expect(isExpenseValid).toHaveBeenCalledWith(validMockedExpense)
    expect(repository.saveGroup).toHaveBeenCalledWith(group)
    expect(addExpensePromise).resolves
  })

  test('should not add an expense to the group if it is not valid', () => {
    const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
    const invalidMockedExpense: Expense = {
      payerId: 0,
      payerName: 'Test user',
      amount: 100,
      description: 'Test expense',
      date: '2022-01-28',
    }

    isExpenseValid.mockReturnValue(false)

    const addExpensePromise = addExpense(repository, group, invalidMockedExpense)

    expect(isExpenseValid).toHaveBeenCalledWith(invalidMockedExpense)
    expect(repository.saveGroup).not.toHaveBeenCalledWith(group)
    expect(addExpensePromise).rejects
  })
})
