//
export function _calculateNetIncome(ordinaryIncome: number, netOtherIncome: number) {
	return ordinaryIncome + netOtherIncome;
}

export function _calculateOrdinaryIncome(grossIncome: number, operatingExpences: number) {
	return grossIncome - operatingExpences;
}

export function _calculateNetOtherIncome(grossIncome: number, operatingExpences: number) {
	return grossIncome - operatingExpences;
}

export function _calculateGrossIncome(period_gross_revenue: number, period_cogs_total: number) {
	return period_gross_revenue - period_cogs_total;
}

export function _calculateOtherIncome(incomeOther: number, otherIncomeInterest: number) {
	return incomeOther - otherIncomeInterest;
}

export function _calculateOtherExpenses(expensesDepriciation: number, expensesInterest: number, expensesTaxesLicenses: number, expensesAmortization: number) {
	return expensesDepriciation + expensesInterest + expensesTaxesLicenses + expensesAmortization;
}
