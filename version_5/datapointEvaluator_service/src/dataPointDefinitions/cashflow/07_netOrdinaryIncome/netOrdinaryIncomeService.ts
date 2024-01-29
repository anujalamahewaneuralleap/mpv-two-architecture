/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

import { _MathOperationInput, _MathOperationResult } from '../cashflowDefinitionInterfaceService';
import {_calculateNetOtherIncome  } from '../cashflowDefinitionService';

// Function to calculate the area of a rectangle
export function calculateOrdinaryIncome(grossIncome: number, operatingExpences: number): _MathOperationResult {
    const input: _MathOperationInput = { operand1: grossIncome, operand2: operatingExpences };
    return _calculateNetOtherIncome(input);
}

// export const calculateOrdinaryIncome = (grossIncome: number, operatingExpences: number): number => {
//     let ordinaryIncome = grossIncome - operatingExpences;
//     return ordinaryIncome;
// };
