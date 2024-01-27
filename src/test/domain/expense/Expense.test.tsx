import { Expense, isExpenseValid } from "domain/expense/Expense";

describe('isExpenseValid', () => {
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

describe('isExpenseNotValid', () => {
    test('invalid playerId', () => {
        const invalidPlayerIdMockedExpense: Expense = {
            payerId: 0,
            amount: 100,
            description: 'Test expense',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidPlayerIdMockedExpense)).toThrow("\nPayer id is not valid.\n");
    });
    test('invalid amount', () => {
        const invalidAmountMockedExpense: Expense = {
            payerId: 1,
            amount: 0,
            description: 'Test expense',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidAmountMockedExpense)).toThrow("\nAmount is not valid.\n");
    });
    test('invalid description', () => {
        const invalidDescriptionMockedExpense: Expense = {
            payerId: 1,
            amount: 100,
            description: '',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidDescriptionMockedExpense)).toThrow("\nDescription is not valid.\n");
    });
    test('invalid date', () => {
        const invalidDateMockedExpense: Expense = {
            payerId: 1,
            amount: 100,
            description: 'Test expense',
            date: '33333333-01-32',
        };
        expect(() => isExpenseValid(invalidDateMockedExpense)).toThrow("\nDate is not valid.\n");
    });
    test('invalid playerId, amount, description, date', () => {
        const invalidAllMockedExpense: Expense = {
            payerId: 0,
            amount: 0,
            description: '',
            date: '33333333-01-32',
        };
        expect(() => isExpenseValid(invalidAllMockedExpense)).toThrow("\nPayer id is not valid.\nAmount is not valid.\nDescription is not valid.\nDate is not valid.\n");
    });
});