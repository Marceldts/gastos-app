import { Expense, ensureIsExpenseValid } from 'domain/expense/Expense'
import { Group } from 'domain/group/Group'
import { GroupRepository } from 'domain/group/Group.repository'

/*
TODO: 
    1- Separar dependencias y argumentos de entrada del caso de uso
    3- GroupRepository tiene lógica de diferentes entidades de dominio y mezcla métodos asíncronos y síncronos
*/
export const addExpense = async (groupRepository: GroupRepository, group: Group, expense: Expense): Promise<void> => {
  ensureIsExpenseValid(expense)
  groupRepository.addExpense(group, expense)
  await groupRepository.saveGroup(group)
}
