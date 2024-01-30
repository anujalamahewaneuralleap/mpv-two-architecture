import { _calculateNetOtherIncome } from "../cashflowDefinitionService";

export function calculateOrdinaryIncome(grossIncome: number, operatingExpences: number){
	return _calculateNetOtherIncome(grossIncome, operatingExpences);
}
