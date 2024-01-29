/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

export const calculatenetOtherIncome = (otherIncome: number, otherExpences: number): number => {
    let netOtherIncome = otherIncome - otherExpences;
    return netOtherIncome;
  };
