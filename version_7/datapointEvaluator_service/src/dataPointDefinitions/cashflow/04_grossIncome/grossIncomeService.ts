import { _calculateGrossIncome } from "../cashflowDefinitionService";

export function calculateGrossIncome(period_gross_revenue: number, period_cogs_total: number){
	return _calculateGrossIncome(period_gross_revenue, period_cogs_total);
}



