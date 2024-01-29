import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";

// imports for calculations
import { calculateNetIncome } from "./03_netIncome/netIncomeService";
import { calculateNetOtherIncome } from "./13_netOtherIncome/netOtherIncomeService";
import { calculateOrdinaryIncome } from "./07_netOrdinaryIncome/netOrdinaryIncomeService";
import { _MathOperationInput, _MathOperationResult } from "./flowDefinitionInterfaceService";

let result = 0; // this is the final calculated value

/*
let's construct the doceasy API

https://unisyn-doceasy-4nscd0jn.ue.gateway.dev/dataretriever/api/v1/search_entities?

user_id=3nt6028h98cng&
doc_type=profit_loss&
year=2021

with that, let's write the querey:

authentication_token=3nt6028h98cng
doc_type=profit_loss
year=2021

Great! let's pass it and get values!
*/

export const cashflowResolver = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		const response = await axios.post("http://localhost:4000", {
			query: `
          query {
            authentication_token,
            document_type,
            doceasy_json_string
          }
        `,
		});

		if (response.data.errors) {
			console.error("GraphQL Query Error:", response.data.errors);
		} else {
			console.log("Response from Server:", response.data.data);

			// so we have the doceasy json response.
			const doceasyResponseJson = JSON.parse(response.data.data.doceasy_json_string);

			/*
      let's store individual values to make the logic simple
      the first 2 period_ordinary_income, period_other_income
      we get the values from doceasy but to test out our current logic
      we will do the calculation
      */
			let period_ordinary_income = doceasyResponseJson.data.period_1_net_ordinary_income[0];
			let period_other_income = doceasyResponseJson.data.period_1_other_income_total[0];

			//
			let period_gross_income = doceasyResponseJson.data.period_1_gross_income[0];
			let period_operating_expences = doceasyResponseJson.data.period_1_operating_expenses_total[0];
			let period_total_other_income = doceasyResponseJson.data.period_1_net_other_income[0];
			let period_total_other_expences = doceasyResponseJson.data.period_1_net_other_expenses[0];

			/*
      Calculation is as follow:
      Income = Ordinary Income (period_1_net_ordinary_income) − Other Income (period_1_other_income_total)
      Ordinary Income = Gross Income (period_1_gross_income) − Operating Expenses (period_1_operating_expenses_total)
      Other Income = Total Other Income (period_1_net_other_income) − Total Other Expenses (NOT FOUND in doceasy used period_1_net_other_expenses)
      
      we have to go in order
      */

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

			result = netIncome.result; // setting it to result

			//result = response.data; // this is only for debugging purpose
		} // end of else

		reply.code(200).send({
			result,
		});
	} catch (error) {
		console.error("Error fetching balance sheet summary:", error);
		reply.code(500).send({ status: "error", message: "Internal Server Error" });
	}
};
