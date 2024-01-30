import { getGroup } from "application/get/getGroup";
import { groupRepositoryMock } from "test/mocks/groupRepository.mock";

describe('getGroup', () => {
    const repository = groupRepositoryMock;
    let getItemMock: jest.SpyInstance;

    beforeAll(() => {
        getItemMock = jest.spyOn(Storage.prototype, 'getItem');
    });

    test('getGroup should call the repository getGroup method method', async () => {
        getItemMock.mockReturnValueOnce(JSON.stringify(undefined));
        await getGroup(repository);
        expect(groupRepositoryMock.getGroup).toHaveBeenCalledTimes(1);
    });
});