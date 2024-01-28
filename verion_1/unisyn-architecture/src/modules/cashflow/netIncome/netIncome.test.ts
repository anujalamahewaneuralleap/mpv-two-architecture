import { calculate } from "../netIncome/netIncomeService";

describe('netIncomeService - calculate', () => {
  it('should add two numbers correctly', () => {
    const result = calculate(10000, 5000);
    expect(result).toBe(15000);
  });

  it('should handle negative numbers', () => {
    const result = calculate(-10000, 5000);
    expect(result).toBe(-5000);
  });

  // handle null and empty and strings
});

