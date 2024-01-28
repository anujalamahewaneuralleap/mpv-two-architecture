/*
This file will get values from the Resolver and do the necessary calculations and send the final value back.
This is where the algorithm lives
*/

export const calculateOrdinaryIncome = (grossIncome: number, operatingExpences: number): number => {
    let ordinaryIncome = grossIncome - operatingExpences;
    return ordinaryIncome;
  };
  

