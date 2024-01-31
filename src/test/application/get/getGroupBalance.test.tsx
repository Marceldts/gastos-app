import { Group } from "domain/group/Group";
import { getGroupBalance } from "application/get/getGroupBalance";
import { groupRepositoryMock } from "test/mocks/groupRepository.mock";
import { User } from "domain/user/User";

describe('Get Group Balance', () => {

    const repository = groupRepositoryMock;

    test('getGroupBalance should call the repository getGroupBalance method', async () => {
        const group: Group = {
            expenseList: new Set(),
            members: new Set(),
        };
        const getGroupBalancePromise = getGroupBalance(repository, group);
        expect(groupRepositoryMock.getGroupBalance).toHaveBeenCalledTimes(1);
        expect(getGroupBalancePromise).toBeInstanceOf(Promise<Map<User, number>>)
    });
});