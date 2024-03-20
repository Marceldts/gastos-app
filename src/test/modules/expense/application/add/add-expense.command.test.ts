import { Expense } from 'modules/expense/domain/Expense'
import { addExpenseCommand } from 'modules/expense/application/add/add-expense.command'
import { groupRepositoryMock } from 'test/mocks/groupRepository.mock'
import { GroupMother } from 'test/modules/group/domain/GroupMother'
import { ExpenseMother } from 'test/modules/expense/domain/ExpenseMother'

describe('Add Expense', () => {
  const repository = groupRepositoryMock

  test('should add an expense to the group', async () => {
    const group = GroupMother.empty()
    const validMockedExpense: Expense = ExpenseMother.valid()

    await addExpenseCommand(repository).execute({ group: group, expense: validMockedExpense })

    expect(repository.saveGroup).toHaveBeenCalledWith(group)
  })

  test('should not add an expense to the group if it is not valid', async () => {
    const group = GroupMother.empty()
    const invalidMockedExpense: Expense = ExpenseMother.invalidAll()

    await expect(
      async () => await addExpenseCommand(repository).execute({ group: group, expense: invalidMockedExpense }),
    ).rejects.toThrow()
  })
})
