import { _calculateOtherExpenses } from "../cashflowDefinitionService";

// just return the passed value
export function calculateOtherExpenses(expensesDepriciation: number, expensesInterest: number, expensesTaxesLicenses: number, expensesAmortization: number) {
	return _calculateOtherExpenses(expensesDepriciation, expensesInterest, expensesTaxesLicenses, expensesAmortization);
}
