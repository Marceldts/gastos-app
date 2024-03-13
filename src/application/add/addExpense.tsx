import { Expense, isExpenseValid } from "domain/expense/Expense";
import { Group } from "domain/group/Group";
import { GroupRepository } from "domain/group/Group.repository";

/*
TODO: 
    1- Separar dependencias y argumentos de entrada del caso de uso
    2- Eliminar try-catch innecesario
    3- GroupRepository tiene lógica de diferentes entidades de dominio y mezcla métodos asíncronos y síncronos
    4- Cláusula de guarda isExpenseValid -> ensureIsExpenseValid
*/
export const addExpense = async (groupRepository: GroupRepository, group: Group, expense: Expense): Promise<void> => {
    try {
        if (isExpenseValid(expense)) {
            groupRepository.addExpense(group, expense);
            await groupRepository.saveGroup(group);
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}