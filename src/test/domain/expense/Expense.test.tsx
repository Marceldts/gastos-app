import { Expense, isExpenseValid } from "domain/expense/Expense";

describe('expense is valid', () => {
    test('valid expense', () => {
        const validMockedExpense: Expense = {
            payerId: 1,
            amount: 100,
            description: 'Test expense',
            date: '2022-01-28',
        };

        expect(() => isExpenseValid(validMockedExpense)).not.toThrow();
    });
});

describe('expense is not valid', () => {

    let mockedExpense: Expense;

    beforeEach(() => {
        mockedExpense = {
            payerId: 1,
            amount: 100,
            description: 'Test expense',
            date: '2022-01-28',
        };
    });

    test('payerId cannot be less than 1', () => {
        const modifiedMockedExpense = {
            ...mockedExpense,
            payerId: 0,
        };
        expect(() => isExpenseValid(modifiedMockedExpense)).toThrow("\nPayer id is not valid.\n");
    });

    test('expense amount cannot be 0 or less', () => {
        const invalidAmountMockedExpense = {
            ...mockedExpense,
            amount: 0,
        };
        expect(() => isExpenseValid(invalidAmountMockedExpense)).toThrow("\nAmount is not valid.\n");
    });
    test('description cannot be empty', () => {
        mockedExpense.description = '';
        expect(() => isExpenseValid(mockedExpense)).toThrow("\nDescription is not valid.\n");
    });
    test('description cannot be blank spaces', () => {
        mockedExpense.description = '            ';
        expect(() => isExpenseValid(mockedExpense)).toThrow("\nDescription is not valid.\n");
    });
    test('description cannot be longer than 50 characters trimmed', () => {
        mockedExpense.description = '     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        expect(() => isExpenseValid(mockedExpense)).toThrow("\nDescription is not valid.\n");
    });
    test('expense date cannot be after the day that is added', () => {
        mockedExpense.date = '33333333-01-32';
        expect(() => isExpenseValid(mockedExpense)).toThrow("\nDate is not valid.\n");
    });

    describe('date format', () => {
        test('year has to be YYYY', () => {
            mockedExpense.date = '111-01-23';
            expect(() => isExpenseValid(mockedExpense)).toThrow("\nDate is not valid.\n");
        });
        test('month has to be MM', () => {
            mockedExpense.date = '2024-001-23';
            expect(() => isExpenseValid(mockedExpense)).toThrow("\nDate is not valid.\n");
        });
        test('day has to be DD', () => {
            mockedExpense.date = '2024-01-023';
            expect(() => isExpenseValid(mockedExpense)).toThrow("\nDate is not valid.\n");
        });
    })

    test('invalid playerId, amount, description, date', () => {
        const invalidAllMockedExpense: Expense = {
            payerId: 0,
            amount: 0,
            description: '',
            date: '33333333-001-0032',
        };
        expect(() => isExpenseValid(invalidAllMockedExpense)).toThrow("\nPayer id is not valid.\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n");
    });
});