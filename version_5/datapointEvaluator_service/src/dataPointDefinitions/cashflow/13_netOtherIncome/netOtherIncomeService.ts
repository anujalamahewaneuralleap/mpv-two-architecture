/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

import { _MathOperationInput, _MathOperationResult } from '../cashflowDefinitionInterfaceService';
import {_calculateNetOtherIncome  } from '../cashflowDefinitionService';

// Function to calculate the area of a rectangle
export function calculateNetOtherIncome(otherIncome: number, otherExpences: number): _MathOperationResult {
    const input: _MathOperationInput = { operand1: otherIncome, operand2: otherExpences };
    return _calculateNetOtherIncome(input);
}

// export const calculatenetOtherIncome = (otherIncome: number, otherExpences: number): number => {
//     let netOtherIncome = otherIncome - otherExpences;
//     return netOtherIncome;
//   };
