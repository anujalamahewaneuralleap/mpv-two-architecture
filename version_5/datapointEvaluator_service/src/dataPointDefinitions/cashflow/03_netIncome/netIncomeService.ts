/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

import { _MathOperationInput, _MathOperationResult } from "../flowDefinitionInterfaceService";
import { _calculateNetOtherIncome } from "../flowDefinitionService";

// Function to calculate the area of a rectangle
export function calculateNetIncome(ordinaryIncome: number, netOtherIncome: number): _MathOperationResult {
	const input: _MathOperationInput = { operand1: ordinaryIncome, operand2: netOtherIncome };
	return _calculateNetOtherIncome(input);
}

// export const calculateNetIncome = (ordinaryIncome: number, netOtherIncome: number): number => {
//   let netIncome = ordinaryIncome + netOtherIncome;
//   return netIncome;
// };
