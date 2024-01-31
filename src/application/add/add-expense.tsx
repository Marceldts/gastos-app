import { Expense, isExpenseValid } from "domain/expense/Expense";
import { Group } from "domain/group/Group";
import { GroupRepository } from "domain/group/Group.repository";

export const addExpense = async (groupRepository: GroupRepository, group: Group, expense: Expense): Promise<void> => {
    try {
        if (isExpenseValid(expense)) {
            group.expenseList.add(expense);
            await groupRepository.saveGroup(group);
        }
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
}