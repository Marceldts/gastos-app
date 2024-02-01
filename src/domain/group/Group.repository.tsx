import { Expense } from "domain/expense/Expense";
import { Group } from "./Group";
import { User } from "domain/user/User";

export interface GroupRepository {
    getGroup(): Promise<Group | undefined>;
    saveGroup(group: Group): Promise<void>;
    addExpense(group: Group, expense: Expense): Promise<void>;
    addMember(group: Group, member: User): Promise<void>;
    getGroupBalance(group: Group): Promise<Map<User, number>> | Promise<null>;
}