import { Expense } from 'expense/domain/Expense'
import { User } from 'user/domain/User'
import { addExpense } from 'expense/application/add/addExpense'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'

describe('Add Expense', () => {
  const repository = groupRepositoryMock

  test('should add an expense to the group', async () => {
    const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
    const validMockedExpense: Expense = {
      payerId: 1,
      payerName: 'Test user',
      amount: 100,
      description: 'Test expense',
      date: '2022-01-28',
    }

    await addExpense(repository, group, validMockedExpense)

    expect(repository.saveGroup).toHaveBeenCalledWith(group)
  })

  test('should not add an expense to the group if it is not valid', async () => {
    const group = { members: new Set<User>(), expenseList: new Set<Expense>() }
    const invalidMockedExpense: Expense = {
      payerId: 0,
      payerName: 'Test user',
      amount: 100,
      description: 'Test expense',
      date: '2022-01-28',
    }

    await expect(async () => await addExpense(repository, group, invalidMockedExpense)).rejects.toThrow()
  })
})
