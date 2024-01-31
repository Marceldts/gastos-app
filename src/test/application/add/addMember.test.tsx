import { User } from "domain/user/User";
import { Group } from "domain/group/Group";
import { groupRepositoryMock } from "test/mocks/groupRepository.mock";
import { addMember } from "application/add/addMember";

describe('Add member', () => {

    const repository = groupRepositoryMock;
    const isUserValid: jest.SpyInstance = jest.spyOn(require('domain/user/User'), 'isUserValid');

    test('should add a member to the group', () => {

        const group: Group = {
            expenseList: new Set(),
            members: new Set(),
        };
        const member: User = { name: 'Test user', balance: 0, id: 1 };

        isUserValid.mockReturnValue(true);

        const addMemberPromise = addMember(repository, group, member);

        expect(isUserValid).toHaveBeenCalledWith(member);
        expect(repository.addMember).toHaveBeenCalledWith(group, member);
        expect(addMemberPromise).resolves;
    });

    test('should not add a member to the group if it is not valid', () => {

        const group: Group = {
            expenseList: new Set(),
            members: new Set(),
        };
        const member = { name: '', balance: 0, id: 1 };

        isUserValid.mockReturnValue(false);

        const addMemberPromise = addMember(repository, group, member);

        expect(isUserValid).toHaveBeenCalledWith(member);
        expect(repository.addMember).not.toHaveBeenCalledWith(group, member);
        expect(addMemberPromise).rejects;
    });
});