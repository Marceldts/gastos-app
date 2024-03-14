import { Expense, ensureIsExpenseValid } from 'modules/expense/domain/Expense'

describe('expense is valid', () => {
  test('valid expense', () => {
    const validMockedExpense: Expense = {
      payerId: 1,
      payerName: 'Test user',
      amount: 100,
      description: 'Test expense',
      date: '2022-01-28',
    }

    expect(() => ensureIsExpenseValid(validMockedExpense)).not.toThrow()
  })
})

describe('expense is not valid', () => {
  let mockedExpense: Expense

  beforeEach(() => {
    mockedExpense = {
      payerId: 1,
      payerName: 'Test user',
      amount: 100,
      description: 'Test expense',
      date: '2022-01-28',
    }
  })

  test('payerId cannot be less than 1', () => {
    const modifiedMockedExpense = {
      ...mockedExpense,
      payerId: 0,
    }
    expect(() => ensureIsExpenseValid(modifiedMockedExpense)).toThrow('\nPayer id is not valid.\n')
  })
  test('expense amount cannot be 0 or less', () => {
    const invalidAmountMockedExpense = {
      ...mockedExpense,
      amount: 0,
    }
    expect(() => ensureIsExpenseValid(invalidAmountMockedExpense)).toThrow('\nAmount is not valid.\n')
  })
  test('description cannot be empty', () => {
    mockedExpense.description = ''
    expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDescription is not valid.\n')
  })
  test('description cannot be blank spaces', () => {
    mockedExpense.description = '            '
    expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDescription is not valid.\n')
  })
  test('description cannot be longer than 50 characters trimmed', () => {
    mockedExpense.description =
      '     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDescription is not valid.\n')
  })
  test('expense date cannot be after the day that is added', () => {
    mockedExpense.date = '33333333-01-32'
    expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDate is not valid.\n')
  })

  describe('date format', () => {
    test('year has to be YYYY', () => {
      mockedExpense.date = '111-01-23'
      expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDate is not valid.\n')
    })
    test('month has to be MM', () => {
      mockedExpense.date = '2024-001-23'
      expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDate is not valid.\n')
    })
    test('day has to be DD', () => {
      mockedExpense.date = '2024-01-023'
      expect(() => ensureIsExpenseValid(mockedExpense)).toThrow('\nDate is not valid.\n')
    })
  })

  test('invalid playerId, payerName, amount, description, date', () => {
    const invalidAllMockedExpense: Expense = {
      payerId: 0,
      payerName: '',
      amount: 0,
      description: '',
      date: '33333333-001-0032',
    }
    expect(() => ensureIsExpenseValid(invalidAllMockedExpense)).toThrow(
      '\nPayer id is not valid.\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n',
    )
  })
})
