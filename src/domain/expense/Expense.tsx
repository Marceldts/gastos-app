import { isAmountValid } from "./ExpenseAmount";
import { isDateValid } from "./ExpenseDate"
import { isDescriptionValid } from "./ExpenseDescription";
import { isPayerIdValid } from "./ExpensePayerId";

export interface Expense {
    readonly payerId: number,
    readonly amount: number,
    description: String,
    date: String
}

export const isExpenseValid = ({ payerId, amount, description, date }: Expense): boolean => {
    let errorMessage = "";
    if (!isPayerIdValid(payerId)) errorMessage += "Payer id is not valid.\n";
    if (!isAmountValid(amount)) errorMessage += "Amount is not valid.\n";
    if (!isDescriptionValid(description)) errorMessage += "Description is not valid.\n";
    if (!isDateValid(date)) errorMessage += "Date is not valid.\n";
    if (errorMessage.length > 0) throw new Error("\n" + errorMessage);
    return true;
}