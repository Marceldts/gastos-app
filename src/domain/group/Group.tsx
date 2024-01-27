import { Expense } from "@domain/expense/Expense";
import { User } from "@domain/user/User";

export interface Group {
    expenseList: Expense[],
    members: User[]
}