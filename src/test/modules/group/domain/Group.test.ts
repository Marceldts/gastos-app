import { User } from 'modules/user/domain/User'
import { Group, ensureIsGroupValid, getGroupBalance } from 'modules/group/domain/Group'
import { GroupMother } from 'test/modules/group/domain/GroupMother'
import { UserMother } from 'test/modules/user/domain/UserMother'

describe('ensureIsGroupValid', () => {
  test('valid group', () => {
    const validMockedGroup: Group = GroupMother.valid()

    expect(() => ensureIsGroupValid(validMockedGroup)).not.toThrow()
  })
})

describe('isGroupNotValid', () => {
  test('members list has duplicate ids', () => {
    const invalidUser1: User = UserMother.withInvalidId()
    const invalidUser2: User = UserMother.withInvalidId()
    const invalidMockedGroup: Group = GroupMother.withMembers(new Set([invalidUser1, invalidUser2]))

    expect(() => ensureIsGroupValid(invalidMockedGroup)).toThrow('\nMembers list has duplicate ids.\n')
  })
  test('cannot have expenses without members', () => {
    const invalidMockedGroup: Group = GroupMother.invalidWithExpensesWithoutMembers()
    expect(() => ensureIsGroupValid(invalidMockedGroup)).toThrow('\nCannot have expenses without members.\n')
  })
})

describe('getGroupBalance', () => {
  test('if the group is empty, getGroupBalance should return an empty map', async () => {
    const group: Group = GroupMother.empty()

    const balance = getGroupBalance(group)

    expect(balance).toEqual(new Map<User, number>())
  })

  test('if the group is not empty, getGroupBalance should return a map with the members and their balance', async () => {
    const member1 = UserMother.validWithIdAndBalance(1, 10)
    const member2 = UserMother.validWithIdAndBalance(2, -10)
    const group: Group = GroupMother.withMembers(new Set([member1, member2]))

    const balance = getGroupBalance(group)

    expect(balance).toEqual(
      new Map<User, number>([
        [member1, 10],
        [member2, -10],
      ]),
    )
  })
})
