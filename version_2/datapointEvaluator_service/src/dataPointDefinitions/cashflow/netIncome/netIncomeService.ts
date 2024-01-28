/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

export const calculateNetIncome = (ordinaryIncome: number, netOtherIncome: number): number => {
  let netIncome = ordinaryIncome + netOtherIncome;
  return netIncome;
};

