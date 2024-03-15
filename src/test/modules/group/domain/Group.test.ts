import { User } from 'modules/user/domain/User'
import { Group, ensureIsGroupValid, getGroupBalance } from 'modules/group/domain/Group'

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

describe('getGroupBalance', () => {
  test('if the group is empty, getGroupBalance should return an empty map', async () => {
    const group: Group = {
      expenseList: new Set(),
      members: new Set(),
    }

    const balance = getGroupBalance(group)

    expect(balance).toEqual(new Map<User, number>())
  })

  test('if the group is not empty, getGroupBalance should return a map with the members and their balance', async () => {
    const member1 = { name: 'Test user 1', balance: 10, id: 1 }
    const member2 = { name: 'Test user 2', balance: -10, id: 2 }
    const group: Group = {
      expenseList: new Set(),
      members: new Set([member1, member2]),
    }

    const balance = getGroupBalance(group)

    expect(balance).toEqual(
      new Map<User, number>([
        [member1, 10],
        [member2, -10],
      ]),
    )
  })
})
