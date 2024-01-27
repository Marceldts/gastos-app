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
    beforeEach(() => {
        let errorMessage = "";
    });
    test('empty name', () => {
        const invalidNameMockedUser: User = {
            id: 1,
            name: "",
            balance: 0
        };
        expect(() => isUserValid(invalidNameMockedUser)).toThrow("\nName is not valid.\n");
    });
    test('name cannot be white spaces', () => {
        const invalidNameMockedUser: User = {
            id: 1,
            name: "     ",
            balance: 0
        };
        expect(() => isUserValid(invalidNameMockedUser)).toThrow("\nName is not valid.\n");
    });
});