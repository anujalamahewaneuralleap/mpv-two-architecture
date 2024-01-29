import { _MathOperationInput, _MathOperationResult } from "../flowDefinitionInterfaceService";
import { _calculateNetOtherIncome } from "../flowDefinitionService";

// Function to calculate the area of a rectangle
export function calculateNetOtherIncome(otherIncome: number, otherExpences: number): _MathOperationResult {
	const input: _MathOperationInput = { operand1: otherIncome, operand2: otherExpences };
	return _calculateNetOtherIncome(input);
}
