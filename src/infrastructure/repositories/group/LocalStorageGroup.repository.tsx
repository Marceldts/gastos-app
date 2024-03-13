import { Debt } from "domain/debt/Debt";
import { Expense } from "domain/expense/Expense";
import { Group, isGroupValid } from "domain/group/Group";
import { GroupRepository } from "domain/group/Group.repository";
import { User } from "domain/user/User";

export const localStorageGroupRepository: GroupRepository = {
    //We have to convert the Arrays to Sets because the Set object is not serializable, and thus, cannot be saved in localStorage.
    getGroup: function (): Promise<Group | undefined> {
        return new Promise((resolve, reject) => {
            try {
                const stringifiedGroup = localStorage.getItem('group');
                console.log("GET GROUP STRINGIFIED: ", stringifiedGroup)
                if (stringifiedGroup) {
                    const parsedGroup = JSON.parse(stringifiedGroup);
                    console.log("GET GROUP PARSED: ", parsedGroup)
                    parsedGroup.members = new Set(parsedGroup.members);
                    console.log("GET GROUP PARSED MEMBERS: ", parsedGroup.members)
                    parsedGroup.expenseList = new Set(parsedGroup.expenseList);
                    resolve(parsedGroup);
                } else {
                    const emptyGroup: Group = {
                        expenseList: new Set(),
                        members: new Set(),
                    };
                    this.saveGroup(emptyGroup).then(() => resolve(emptyGroup));
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    //We have to convert the Sets to Arrays because the Set object is not serializable, and thus, cannot be saved in localStorage.
    saveGroup: function (group: Group): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const groupToSave = {
                    expenseList: Array.from(group.expenseList ?? []),
                    members: Array.from(group.members ?? []),
                };
                localStorage.setItem('group', JSON.stringify(groupToSave));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    /*
        TODO: Aplicar ley demeter
    */
       /*
        TODO: Quitar new Promise
    */
    addExpense: async function (group: Group, expense: Expense): Promise<void> {
        group.expenseList.add(expense);
        let payerFound = false;
        const totalReceivers = group.members.size;
        const amountPerReceiver = expense.amount / totalReceivers;

        group.members.forEach((user) => {
            if (user.id === expense.payerId) {
                payerFound = true;
                user.balance += expense.amount;
            }
            user.balance -= amountPerReceiver;
        });

        if (!payerFound) {
            throw new Error("No se encontró al pagador en el conjunto de usuarios.")
        }

        this.saveGroup(group)
    },
    addMember: function (group: Group, member: User): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                console.warn("ENTRA A ADDMEMBER")
                group.members.add(member);
                this.saveGroup(group).then(() => resolve());
            } catch (error) {
                reject(error);
            }
        });
    },
    getGroupBalance: function ({ members }: Group): Promise<Map<User, number>> | Promise<null> {
        if (!members) return Promise.resolve(null);
        const groupBalance = new Map<User, number>();

        Array.from(members).forEach((member) => {
            groupBalance.set(member, member.balance);
        });
        return Promise.resolve(groupBalance);
    },
    getGroupDebts: function ({ members }: Group): Promise<Debt[]> {
        const sortedUsers = Array.from(members).sort((a, b) => a.balance - b.balance);
        const debts: Debt[] = [];

        while (sortedUsers.length > 1) {
            const debtor = sortedUsers[0] as User;
            const creditor = sortedUsers[sortedUsers.length - 1] as User;

            const amount = Math.min(Math.abs(debtor.balance), Math.abs(creditor.balance));
            const amountFixed = parseFloat(amount.toFixed(2));

            debtor.balance = parseFloat((debtor.balance + amount).toFixed(2));
            creditor.balance = parseFloat((creditor.balance - amount).toFixed(2));

            debts.push({
                debtor,
                creditor,
                amount: amountFixed.toString(),
            });

            if (debtor.balance === 0) sortedUsers.shift();
            if (creditor.balance === 0) sortedUsers.pop();
        }

        return Promise.resolve(debts);
    }
}
