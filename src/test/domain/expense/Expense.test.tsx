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
    test('payerId cannot be less than 1', () => {
        const invalidPlayerIdMockedExpense: Expense = {
            payerId: 0.1,
            amount: 100,
            description: 'Test expense',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidPlayerIdMockedExpense)).toThrow("\nPayer id is not valid.\n");
    });
    test('expense amount cannot be 0 or less', () => {
        const invalidAmountMockedExpense: Expense = {
            payerId: 1,
            amount: 0,
            description: 'Test expense',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidAmountMockedExpense)).toThrow("\nAmount is not valid.\n");
    });
    test('description cannot be empty', () => {
        const invalidDescriptionMockedExpense: Expense = {
            payerId: 1,
            amount: 100,
            description: '',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidDescriptionMockedExpense)).toThrow("\nDescription is not valid.\n");
    });
    test('description cannot be blank spaces', () => {
        const invalidDescriptionMockedExpense: Expense = {
            payerId: 1,
            amount: 100,
            description: '            ',
            date: '2022-01-28',
        };
        expect(() => isExpenseValid(invalidDescriptionMockedExpense)).toThrow("\nDescription is not valid.\n");
    });
    test('expense date cannot be after the day that is added', () => {
        const invalidDateMockedExpense: Expense = {
            payerId: 1,
            amount: 100,
            description: 'Test expense',
            date: '33333333-01-32',
        };
        expect(() => isExpenseValid(invalidDateMockedExpense)).toThrow("\nDate is not valid.\n");
    });
    describe('date format', () => {
        test('year has to be YYYY', () => {
            const invalidDateMockedExpense: Expense = {
                payerId: 1,
                amount: 100,
                description: 'Test expense',
                date: '111-01-23',
            };
            expect(() => isExpenseValid(invalidDateMockedExpense)).toThrow("\nDate is not valid.\n");
        });
        test('month has to be MM', () => {
            const invalidDateMockedExpense: Expense = {
                payerId: 1,
                amount: 100,
                description: 'Test expense',
                date: '2024-001-23',
            };
            expect(() => isExpenseValid(invalidDateMockedExpense)).toThrow("\nDate is not valid.\n");
        });
        test('day has to be DD', () => {
            const invalidDateMockedExpense: Expense = {
                payerId: 1,
                amount: 100,
                description: 'Test expense',
                date: '2024-01-023',
            };
            expect(() => isExpenseValid(invalidDateMockedExpense)).toThrow("\nDate is not valid.\n");
        });
    })

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