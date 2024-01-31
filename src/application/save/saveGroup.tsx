import { Group, isGroupValid } from "domain/group/Group";
import { GroupRepository } from "domain/group/Group.repository";

export const saveGroup = async (groupRepository: GroupRepository, group: Group): Promise<void> => {
    try {
        if (isGroupValid(group)) await groupRepository.saveGroup(group);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};