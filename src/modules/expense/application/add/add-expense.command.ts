import { Expense, ensureIsExpenseValid } from 'modules/expense/domain/Expense'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'
import { Command } from 'shared/application/usecase/command'

/*
TODO: 
    3- GroupRepository tiene lógica de diferentes entidades de dominio
*/
export const addExpenseCommand = (
  groupRepository: GroupRepository,
): Command<void, { group: Group; expense: Expense }> => ({
  execute: async ({ group, expense }) => {
    ensureIsExpenseValid(expense)
    await groupRepository.addExpense(group, expense)
    await groupRepository.saveGroup(group)
  },
})
