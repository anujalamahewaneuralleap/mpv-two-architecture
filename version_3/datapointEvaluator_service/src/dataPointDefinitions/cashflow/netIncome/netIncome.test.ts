/*

*/

import { calculateNetIncome } from "../netIncome/netIncomeService";

describe('netIncomeService - calculate', () => {
  it('should add two numbers correctly', () => {
    const result = calculateNetIncome(10000, 5000);
    expect(result).toBe(15000);
  });
});

