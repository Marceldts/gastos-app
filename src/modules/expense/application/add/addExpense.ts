import { Expense, ensureIsExpenseValid } from 'modules/expense/domain/Expense'
import { Group } from 'modules/group/domain/Group'
import { GroupRepository } from 'modules/group/domain/Group.repository'

/*
TODO: 
    1- Separar dependencias y argumentos de entrada del caso de uso
    3- GroupRepository tiene lógica de diferentes entidades de dominio
*/
export const addExpense = async (groupRepository: GroupRepository, group: Group, expense: Expense): Promise<void> => {
  ensureIsExpenseValid(expense)
  await groupRepository.addExpense(group, expense)
  await groupRepository.saveGroup(group)
}
