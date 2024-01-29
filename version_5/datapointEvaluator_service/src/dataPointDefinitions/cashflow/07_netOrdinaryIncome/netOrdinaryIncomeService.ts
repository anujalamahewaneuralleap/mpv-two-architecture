import { _MathOperationInput, _MathOperationResult } from "../flowDefinitionInterfaceService";
import { _calculateNetOtherIncome } from "../flowDefinitionService";

// Function to calculate the area of a rectangle
export function calculateOrdinaryIncome(grossIncome: number, operatingExpences: number): _MathOperationResult {
	const input: _MathOperationInput = { operand1: grossIncome, operand2: operatingExpences };
	return _calculateNetOtherIncome(input);
}
