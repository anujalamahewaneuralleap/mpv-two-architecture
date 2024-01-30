// imports for calculations
import { calculateNetIncome } from "./03_netIncome/netIncomeService";
import { calculateNetOtherIncome } from "./13_netOtherIncome/netOtherIncomeService";
import { calculateOrdinaryIncome } from "./07_netOrdinaryIncome/netOrdinaryIncomeService";
import { _MathOperationInput, _MathOperationResult } from "./cashflowDefinitionInterfaceService";

// Example asynchronous functions that return promises
function asyncTask1(period_total_other_income: number, period_total_other_expences: number, period_gross_income: number, period_operating_expences: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("-------------------------");
            console.log("");
			console.log("START Executing asyncTask3...");
            console.log("");

			// first calculate Other Income
			let otherIncome: _MathOperationResult = calculateNetOtherIncome(Number(period_total_other_income), Number(period_total_other_expences));
			// then Ordinary Income
			let ordinaryIncome: _MathOperationResult = calculateOrdinaryIncome(Number(period_gross_income), Number(period_operating_expences));
			// finally we can calcuate the total by the above 2 values
			let netIncome = calculateNetIncome(Number(ordinaryIncome.result), Number(otherIncome.result));

			// console log for debugging
			console.log("Net Other Income:", otherIncome.result);
			console.log("Net Ordinary Income:", ordinaryIncome.result);
			console.log("Net Income:", netIncome.result);
            console.log("");
			console.log("END: Executing asyncTask3...");
            console.log("-------------------------");
            console.log("");
			resolve(netIncome.result);
		}, 3000); // Simulating a delay of 2 seconds
	});
}

// Example asynchronous functions that return promises
function asyncTask2(period_total_other_income: number, period_total_other_expences: number, period_gross_income: number, period_operating_expences: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("-------------------------");
            console.log("");
			console.log("START Executing asyncTask3...");
            console.log("");

			// first calculate Other Income
			let otherIncome: _MathOperationResult = calculateNetOtherIncome(Number(period_total_other_income), Number(period_total_other_expences));
			// then Ordinary Income
			let ordinaryIncome: _MathOperationResult = calculateOrdinaryIncome(Number(period_gross_income), Number(period_operating_expences));
			// finally we can calcuate the total by the above 2 values
			let netIncome = calculateNetIncome(Number(ordinaryIncome.result), Number(otherIncome.result));

			// console log for debugging
			console.log("Net Other Income:", otherIncome.result);
			console.log("Net Ordinary Income:", ordinaryIncome.result);
			console.log("Net Income:", netIncome.result);
            console.log("");
			console.log("END: Executing asyncTask3...");
            console.log("-------------------------");
            console.log("");
			resolve(netIncome.result);
		}, 5000); // Simulating a delay of 2 seconds
	});
}

// Example asynchronous functions that return promises
function asyncTask3(period_total_other_income: number, period_total_other_expences: number, period_gross_income: number, period_operating_expences: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
            console.log("-------------------------");
            console.log("");
			console.log("START Executing asyncTask3...");
            console.log("");

			// first calculate Other Income
			let otherIncome: _MathOperationResult = calculateNetOtherIncome(Number(period_total_other_income), Number(period_total_other_expences));
			// then Ordinary Income
			let ordinaryIncome: _MathOperationResult = calculateOrdinaryIncome(Number(period_gross_income), Number(period_operating_expences));
			// finally we can calcuate the total by the above 2 values
			let netIncome = calculateNetIncome(Number(ordinaryIncome.result), Number(otherIncome.result));

			// console log for debugging
			console.log("Net Other Income:", otherIncome.result);
			console.log("Net Ordinary Income:", ordinaryIncome.result);
			console.log("Net Income:", netIncome.result);
            console.log("");
			console.log("END: Executing asyncTask3...");
            console.log("-------------------------");
            console.log("");
			resolve(netIncome.result);
		}, 7000); // Simulating a delay of 2 seconds
	});
}

// Example usage of Promise.all() to execute tasks concurrently
export async function executeParallelTasks(period_total_other_income: number, period_total_other_expences: number, period_gross_income: number, period_operating_expences: number)
: Promise<number> {
	try {
		// Execute multiple asynchronous tasks concurrently
		const [result1, result2, result3] = await Promise.all([
			asyncTask1(period_total_other_income, period_total_other_expences, period_gross_income, period_operating_expences),
			asyncTask2(period_total_other_income, period_total_other_expences, period_gross_income, period_operating_expences),
			asyncTask3(period_total_other_income, period_total_other_expences, period_gross_income, period_operating_expences),
		]);

		// Log the results
		console.log("Result of asyncTask1:", result1);
		console.log("Result of asyncTask2:", result2);
		console.log("Result of asyncTask3:", result3);
		
        return result1 + result2 + result3;

	} catch (error) {
		console.error("Error occurred:", error);
        throw error;
	}
}
