/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

import { MathOperationInput, MathOperationResult } from '../CashflowDefinitionInterfaceService';
import {calculateNetOtherIncome  } from '../CashflowDefinitionService';

// Function to calculate the area of a rectangle
export function _calculateNetOtherIncome(otherIncome: number, otherExpences: number): MathOperationResult {
    const input: MathOperationInput = { operand1: otherIncome, operand2: otherExpences };
    return calculateNetOtherIncome(input);
}

// export const calculatenetOtherIncome = (otherIncome: number, otherExpences: number): number => {
//     let netOtherIncome = otherIncome - otherExpences;
//     return netOtherIncome;
//   };
