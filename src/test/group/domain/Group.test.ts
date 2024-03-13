import { User } from 'user/domain/User'
import { Group, ensureIsGroupValid } from 'group/domain/Group'

describe('ensureIsGroupValid', () => {
  test('valid group', () => {
    const validMockedGroup: Group = {
      expenseList: new Set(),
      members: new Set(),
    }
    expect(() => ensureIsGroupValid(validMockedGroup)).not.toThrow()
  })
})

describe('isGroupNotValid', () => {
  test('members list has duplicate ids', () => {
    const invalidUser1: User = {
      id: 1,
      name: 'Test user 1',
      balance: 0,
    }
    const invalidUser2: User = {
      id: 1,
      name: 'Test user 2',
      balance: 0,
    }
    const invalidMockedGroup: Group = {
      expenseList: new Set(),
      members: new Set([invalidUser1, invalidUser2]),
    }
    expect(() => ensureIsGroupValid(invalidMockedGroup)).toThrow('\nMembers list has duplicate ids.\n')
  })
  test('cannot have expenses without members', () => {
    const invalidMockedGroup: Group = {
      expenseList: new Set([
        {
          payerId: 1,
          payerName: 'Test',
          amount: 100,
          description: 'Test expense',
          date: '2022-01-28',
        },
      ]),
      members: new Set(),
    }
    expect(() => ensureIsGroupValid(invalidMockedGroup)).toThrow('\nCannot have expenses without members.\n')
  })
})
