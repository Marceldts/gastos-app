import { User, isUserValid } from "domain/user/User";

describe('isUserValid', () => {
    test('valid user', () => {
        const validMockedUser: User = {
            id: 1,
            name: "Test user",
            balance: 0
        };
        expect(() => isUserValid(validMockedUser)).not.toThrow();
    });
});

describe('isUserNotValid', () => {
    let mockedUser: User;

    beforeEach(() => {
        mockedUser = {
            id: 1,
            name: "Test user",
            balance: 0
        };
    });

    test('empty name', () => {
        mockedUser.name = "";
        expect(() => isUserValid(mockedUser)).toThrow("\nName is not valid.\n");
    });
    test('name cannot be white spaces', () => {
        mockedUser.name = "           ";
        expect(() => isUserValid(mockedUser)).toThrow("\nName is not valid.\n");
    });
    test('name cannot be longer than 50 characters trimmed', () => {
        mockedUser.name = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        expect(() => isUserValid(mockedUser)).toThrow("\nName is not valid.\n");
    });
});