import { FastifyRequest, FastifyReply } from "fastify";
import { calculatePeriod } from "./01_period/periodService";
import { calculateName} from "./02_name/nameService";
import { calculateNetIncome } from "./03_netIncome/netIncomeService";
import { calculateGrossIncome } from "./04_grossIncome/grossIncomeService";
import { calculateGrossRevenue } from "./05_grossRevenue/grossRevenueService";
import { calculateCogs } from "./06_cogs/cogsService";
import { calculateOrdinaryIncome } from "./07_netOrdinaryIncome/netOrdinaryIncomeService";
import { calculateOperatingExpenses } from "./08_operatingExpenses/operatingExpensesService";
import { calculateExpensesDescription } from "./09_expensesDescription/expensesDescriptionService";
import { calculateExpensesInterest} from "./10_expensesInterest/expensesInterestService";
import { calculateExpensesLicenses } from "./11_expensesTaxesLicenses/expensesTaxesLicensesService";
import { calculateExpensesOther } from "./12_expensesOther/expensesOtherService";
import { calculateNetOtherIncome } from "./13_netOtherIncome/netOtherIncomeService";
import { calculateOtherIncome } from "./14_otherIncome/otherIncomeService";
import { calculateIncomeInterest } from "./15_incomeInterest/incomeInterestService";
import { calculateIncomeOther } from "./16_incomeOther/incomeOtherService";
import { calculateOtherExpenses } from "./17_otherExpenses/otherExpensesService";
import { calculateExpensesDepriciation } from "./18_expensesDeprecaiation/expensesDepriciationService";
//import { calculateExpensesInterest } from "./19_expensesInterest/expensesInterestService";
import {calculateExpensesTaxesLicenses } from "./20_expensesTaxesLicenses/expensesTaxesLicensesService";
import { calculateExpensesAmortization } from "./21_expensesAmortization/expensesAmortizationService";


function asyncCalculateNetOtherIncome(period_total_other_income: number, period_total_other_expences: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(calculateNetOtherIncome(Number(period_total_other_income), Number(period_total_other_expences)));
		}, 3000); // Simulating a delay of 3 seconds for the demo
	});
}

function asyncCalculateOrdinaryIncome(period_gross_income: number, period_operating_expences: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(calculateOrdinaryIncome(Number(period_gross_income), Number(period_operating_expences)));
		}, 5000); // Simulating a delay of 5 seconds for the demo
	});
}

function asyncCalculateNetIncome(period_ordinary_income: number, period_other_income: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(calculateNetIncome(Number(period_ordinary_income), Number(period_other_income)));
		}, 7000); // Simulating a delay of 2 seconds for the demo
	});
}

function asyncCalculateGrossIncome(period_gross_revenue: number, period_cogs_total: number): Promise<number> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(calculateGrossIncome(Number(period_gross_revenue), Number(period_cogs_total)));
		}, 3000); // Simulating a delay of 3 seconds for the demo
	});
}

// Example usage of Promise.all() to execute tasks concurrently
async function executeParallelTasks(
	period_total_other_income: number,
	period_total_other_expences: number,
	period_gross_income: number,
	period_operating_expences: number,
	period_ordinary_income: number,
	period_other_income: number,
	period_gross_revenue: number,
	period_cogs_total: number,
	document_name: string
): Promise<any> {
	try {
		// Execute multiple asynchronous tasks concurrently
		const [
			NetOtherIncomeAnswer, 
			ordinaryIncomeAnswer, 
			netIncomeAnswer, 
			grossIncomeAnswer,
			documentNameAnswer,
			grossRevenueAnswer
		] = await Promise.all([
			asyncCalculateNetOtherIncome(period_total_other_income, period_total_other_expences),
			asyncCalculateOrdinaryIncome(period_gross_income, period_operating_expences),
			asyncCalculateNetIncome(period_ordinary_income, period_other_income),
			asyncCalculateGrossIncome(period_gross_revenue, period_cogs_total),
			calculateName(document_name), // direct call
			calculateGrossRevenue(period_gross_revenue), // direct call
			calculateCogs(period_cogs_total) // direct call
		]);

		// Create JSON object
		const jsonObject = {
			"net_other_income": NetOtherIncomeAnswer,
			"ordinary_income": ordinaryIncomeAnswer,
			"net_income": netIncomeAnswer,
			"gross_income": grossIncomeAnswer,
			"document_name": documentNameAnswer,
			"gross_revenue": grossRevenueAnswer
		};

		console.log(jsonObject);
		return jsonObject;
	} catch (error) {
		console.error("Error occurred:", error);
		throw error;
	}
}

// we call doceasy REST API and get the following result:
const doceasy_json_object = {
		"data": {
			"period_1_cogs_total": [2015.25],
			"period_1_gross_income": [496225.22],
			"period_1_gross_revenue": [498240.0],
			"period_1_name": ["January - December 2021"],
			"period_1_net_income": [-245060.98],
			"period_1_net_ordinary_income": [-246687.3],
			"period_1_net_other_income": [1626.32],
			"period_1_operating_expenses_depreciation": [190078.38],
			"period_1_operating_expenses_interest": [3559.88],
			"period_1_operating_expenses_taxes_licenses": [10192.75],
			"period_1_operating_expenses_total": [742912.0],
			"period_1_other_income_interest_income": [1626.32],
			"period_1_other_income_total": [1626.32],
			"period_1_net_other_expenses": [5000]
		},
		"document_date": "2021",
		"document_name": "user_document/wade/profit & loss/EMT Holdings - PNL 2021.pdf",
		"document_parsed_datetime": "Thu, 11 Jan 2024 15:04:21 GMT",
		"document_type": "profit_loss",
		"document_update_datetime": "Thu, 11 Jan 2024 18:39:36 GMT",
		"document_upload_datetime": "Thu, 11 Jan 2024 15:04:21 GMT",
		"userID": "3nt6028h98cng"
};

export const cashflowResolver = async (request: FastifyRequest<{ Params: "" }>, reply: FastifyReply): Promise<void> => {
	try {
		let result;

		let period_ordinary_income = doceasy_json_object.data.period_1_net_ordinary_income[0];
		let period_other_income = doceasy_json_object.data.period_1_other_income_total[0];
		let period_gross_income = doceasy_json_object.data.period_1_gross_income[0];
		let period_operating_expences = doceasy_json_object.data.period_1_operating_expenses_total[0];
		let period_total_other_income = doceasy_json_object.data.period_1_net_other_income[0];
		let period_total_other_expences = doceasy_json_object.data.period_1_net_other_expenses[0];
		let period_gross_revenue = doceasy_json_object.data.period_1_gross_revenue[0];
		let period_cogs_total = doceasy_json_object.data.period_1_cogs_total[0];
		let document_name = doceasy_json_object.document_name;

		// Wait for the result of executeParallelTasks
		result = await executeParallelTasks(
			period_total_other_income, 
			period_total_other_expences, 
			period_gross_income, 
			period_operating_expences, 
			period_ordinary_income, 
			period_other_income, 
			period_gross_revenue, 
			period_cogs_total,
			document_name
		);

		reply.code(200).send({
			message: result,
		});
	} catch (error) {
		console.error("Error fetching data:", error);
		reply.code(500).send({ status: "error", message: "Internal Server Error" });
	}
};
