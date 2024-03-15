import { Expense, ensureIsExpenseValid } from 'modules/expense/domain/Expense'
import { ExpenseMother } from 'modules/expense/domain/ExpenseMother'

describe('expense is valid', () => {
  test('valid expense', () => {
    const validMockedExpense: Expense = ExpenseMother.valid()

    expect(() => ensureIsExpenseValid(validMockedExpense)).not.toThrow()
  })
})

describe('expense is not valid', () => {
  test('payerId cannot be less than 1', () => {
    const invalidMockedExpense = ExpenseMother.validWithPayerId(-10)
    expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nPayer id is not valid.\n')
  })
  test('expense amount cannot be 0 or less', () => {
    const invalidMockedExpense = ExpenseMother.validWithAmount(-10)
    expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nAmount is not valid.\n')
  })
  test('description cannot be empty', () => {
    const invalidMockedExpense = ExpenseMother.validWithDescription('')
    expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDescription is not valid.\n')
  })
  test('description cannot be blank spaces', () => {
    const invalidMockedExpense = ExpenseMother.validWithDescription('     ')
    expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDescription is not valid.\n')
  })
  test('description cannot be longer than 50 characters trimmed', () => {
    const invalidMockedExpense = ExpenseMother.validWithDescription(
      '     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    )
    expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDescription is not valid.\n')
  })
  test('expense date cannot be after the day that is added', () => {
    const invalidMockedExpense = ExpenseMother.withInvalidDate()
    expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDate is not valid.\n')
  })

  describe('date format', () => {
    test('year has to be YYYY', () => {
      const invalidMockedExpense = ExpenseMother.validWithDate('111-01-23')
      expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDate is not valid.\n')
    })
    test('month has to be MM', () => {
      const invalidMockedExpense = ExpenseMother.validWithDate('2024-001-23')
      expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDate is not valid.\n')
    })
    test('day has to be DD', () => {
      const invalidMockedExpense = ExpenseMother.validWithDate('2024-01-023')
      expect(() => ensureIsExpenseValid(invalidMockedExpense)).toThrow('\nDate is not valid.\n')
    })
  })

  test('invalid playerId, payerName, amount, description, date', () => {
    const invalidAllMockedExpense: Expense = ExpenseMother.invalidAll()
    expect(() => ensureIsExpenseValid(invalidAllMockedExpense)).toThrow(
      '\nPayer id is not valid.\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n',
    )
  })
})
