import { _MathOperationInput, _MathOperationResult } from "./flowDefinitionInterfaceService";

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
