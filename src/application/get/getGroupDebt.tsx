import { Group } from "domain/group/Group";
import { GroupRepository } from "domain/group/Group.repository";

export const getGroupDebt = async (groupRepository: GroupRepository, group: Group) => {
    try {
        console.log("GET GROUP DEBT GROUP: ", group)
        const debts = await groupRepository.getGroupDebts(group);
        return Promise.resolve(debts);
    } catch (error) {
        return Promise.reject(error);
    }
}