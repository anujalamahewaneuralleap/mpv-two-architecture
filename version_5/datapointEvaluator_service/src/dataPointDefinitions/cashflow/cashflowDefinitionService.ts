import { _MathOperationInput, _MathOperationResult } from "./cashflowDefinitionInterfaceService";

// calculateNetIncome
export function _calculateNetIncome(input: _MathOperationInput): _MathOperationResult {
	// result = ordinaryIncome + netOtherIncome;
	const result = input.operand1 + input.operand2;
	return { result };
}

// calculateOrdinaryIncome
export function _calculateOrdinaryIncome(input: _MathOperationInput): _MathOperationResult {
	// result = grossIncome - operatingExpences;
	const result = input.operand1 - input.operand2;
	return { result };
}

// calculatenetOtherIncome
export function _calculateNetOtherIncome(input: _MathOperationInput): _MathOperationResult {
	// result = otherIncome - otherExpences;
	const result = input.operand1 - input.operand2;
	return { result };
}

// calculateGrossIncome
export function _calculateGrossIncome(input: _MathOperationInput): _MathOperationResult {
	// result = grossRevenue - cogs;
	const result = input.operand1 - input.operand2;
	return { result };
}

/* 
//------------------------------
calculateOperatingExpenses
calculateOperatingExpensesOther
calculateOtherIncome
calculateOtherExpenses
calculateExpensesOther
//------------------------------

Sample operating expenses data

const expenses: number[] = [10000, 5000, 3000, 2000, 1500]; // Sample expenses in dollars

// Function to calculate total operating expenses
function calculateOperatingExpenses(expenses: number[]): number {
    // Sum up all expenses
    const totalExpenses: number = expenses.reduce((acc, expense) => acc + expense, 0);
    return totalExpenses;
}

// Calculate operating expenses
const totalOperatingExpenses: number = calculateOperatingExpenses(expenses);
console.log("Total Operating Expenses:", totalOperatingExpenses);

*/
