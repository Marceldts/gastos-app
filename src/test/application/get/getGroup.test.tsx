import { getGroup } from "application/get/getGroup";
import { groupRepositoryMock } from "test/mocks/groupRepository.mock";

describe('getGroup', () => {
    const repository = groupRepositoryMock;

    test('getGroup should call the repository getGroup method method', async () => {
        await getGroup(repository);
        expect(groupRepositoryMock.getGroup).toHaveBeenCalledTimes(1);
    });
});