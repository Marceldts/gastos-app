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
                if (stringifiedGroup) {
                    const parsedGroup = JSON.parse(stringifiedGroup);
                    parsedGroup.members = new Set(parsedGroup.members);
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
                    expenseList: Array.from(group.expenseList),
                    members: Array.from(group.members),
                };
                localStorage.setItem('group', JSON.stringify(groupToSave));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    addExpense: function (group: Group, expense: Expense): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                group.expenseList.add(expense);
                this.saveGroup(group).then(() => resolve());
            } catch (error) {
                reject(error);
            }
        });
    },
    addMember: function (group: Group, member: User): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                group.members.add(member);
                this.saveGroup(group).then(() => resolve());
            } catch (error) {
                reject(error);
            }
        });
    },
    getGroupBalance: function ({ members }: Group): Promise<Map<User, number>> | Promise<null> {
        const groupBalance = new Map<User, number>();
        for (const member of members) {
            groupBalance.set(member, member.balance);
        }
        return Promise.resolve(groupBalance);
    }
}
