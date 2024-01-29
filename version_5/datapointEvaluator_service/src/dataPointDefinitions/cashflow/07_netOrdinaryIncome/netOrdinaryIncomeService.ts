/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

import { MathOperationInput, MathOperationResult } from '../../DefinitionInterfaceService';
import {calculateNetOtherIncome  } from '../../DefinitionService';

// Function to calculate the area of a rectangle
export function _calculateOrdinaryIncome(grossIncome: number, operatingExpences: number): MathOperationResult {
    const input: MathOperationInput = { operand1: grossIncome, operand2: operatingExpences };
    return calculateNetOtherIncome(input);
}

// export const calculateOrdinaryIncome = (grossIncome: number, operatingExpences: number): number => {
//     let ordinaryIncome = grossIncome - operatingExpences;
//     return ordinaryIncome;
// };
