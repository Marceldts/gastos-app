import { Expense } from "@domain/expense/Expense";
import { Group } from "@domain/group/Group";
import { GroupRepository } from "@domain/group/Group.repository";
import { User } from "@domain/user/User";

export const localStorageGroupRepository: GroupRepository = {
    getGroup: function (): Promise<Group | undefined> {
        throw new Error("Function not implemented.");
    },
    saveGroup: function (group: Group): Promise<void> {
        throw new Error("Function not implemented.");
    },
    addExpense: function (group: Group, expense: Expense): Promise<void> {
        throw new Error("Function not implemented.");
    },
    addMember: function (group: Group, member: User): Promise<void> {
        throw new Error("Function not implemented.");
    },
    getGroupBalance: function (group: Group): Promise<Map<User, number>> | Promise<null> {
        throw new Error("Function not implemented.");
    }
}
