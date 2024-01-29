import { MathOperationInput, MathOperationResult } from './DefinitionInterfaceService';

// calculateNetIncome 
export function calculateNetIncome(input: MathOperationInput): MathOperationResult {
    // result = ordinaryIncome + netOtherIncome;
    const result = input.operand1 + input.operand2;
    return { result };
};

// calculateOrdinaryIncome
export function calculateOrdinaryIncome(input: MathOperationInput): MathOperationResult {
    // result = grossIncome - operatingExpences;
    const result = input.operand1 - input.operand2;
    return { result };
};

// calculatenetOtherIncome
export function calculateNetOtherIncome(input: MathOperationInput): MathOperationResult {
    // result = otherIncome - otherExpences;
    const result = input.operand1 - input.operand2;
    return { result };
};
