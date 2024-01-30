// calculateNetIncome
export function _calculateNetIncome(ordinaryIncome: number, netOtherIncome: number) {
	return ordinaryIncome + netOtherIncome;
}

// calculateOrdinaryIncome
export function _calculateOrdinaryIncome(grossIncome: number, operatingExpences: number) {
	return grossIncome - operatingExpences;
}

// calculatenetOtherIncome
export function _calculateNetOtherIncome(grossIncome: number, operatingExpences: number) {
	return grossIncome - operatingExpences;
}

// calculateGrossIncome
export function _calculateGrossIncome(period_gross_revenue: number, period_cogs_total: number) {
	return period_gross_revenue - period_cogs_total;
}

//
export function _calculateOtherIncome(incomeOther: number, otherIncomeInterest: number) {
	return incomeOther - otherIncomeInterest;
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
