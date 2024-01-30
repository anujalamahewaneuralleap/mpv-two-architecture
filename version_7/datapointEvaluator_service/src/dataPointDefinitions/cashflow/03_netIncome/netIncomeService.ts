import { _calculateNetIncome } from "../cashflowDefinitionService";

export function calculateNetIncome(ordinaryIncome: number, netOtherIncome: number) {
	return _calculateNetIncome(ordinaryIncome, netOtherIncome);
}
