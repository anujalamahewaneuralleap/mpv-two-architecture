/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

import { MathOperationInput, MathOperationResult } from '../CashflowDefinitionInterfaceService';
import {calculateNetOtherIncome  } from '../CashflowDefinitionService';

// Function to calculate the area of a rectangle
export function _calculateNetIncome(ordinaryIncome: number, netOtherIncome: number): MathOperationResult {
    const input: MathOperationInput = { operand1: ordinaryIncome, operand2: netOtherIncome };
    return calculateNetOtherIncome(input);
}

// export const calculateNetIncome = (ordinaryIncome: number, netOtherIncome: number): number => {
//   let netIncome = ordinaryIncome + netOtherIncome;
//   return netIncome;
// };
