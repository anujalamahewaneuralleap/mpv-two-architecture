import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";

// imports for calculations
import { calculateNetIncome } from "./03_netIncome/netIncomeService";
import { calculatenetOtherIncome } from "./13_netOtherIncome/netOtherIncomeService";
import { calculateOrdinaryIncome } from "./07_netOrdinaryIncome/netOrdinaryIncomeService";

let result = 0 // this is the final calculated value

export const cashflowResolver = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const response = await axios.post("http://localhost:4000", {
      query: `
          query {
            period_1_cogs_total,
            period_1_gross_income,
            period_1_gross_revenue,
            period_1_name,
            period_1_net_income,
            period_1_net_ordinary_income,
            period_1_net_other_income,
            period_1_operating_expenses_depreciation,
            period_1_operating_expenses_interest,
            period_1_operating_expenses_taxes_licenses,
            period_1_operating_expenses_total,
            period_1_other_income_interest_income,
            period_1_other_income_total,
            period_1_net_other_expenses
          }
        `,
    });

    if (response.data.errors) {
      console.error("GraphQL Query Error:", response.data.errors);
    } else {
      console.log("Response from Server:", response.data.data);

      // let's store individual values to make the logic simple
      let period_ordinary_income= response.data.data.period_1_net_ordinary_income; // we have to use calculated values
      let period_other_income= response.data.data.period_1_other_income_total; // we have to use calcualated values
      let period_gross_income= response.data.data.period_1_gross_income;
      let period_operating_expences= response.data.data.period_1_operating_expenses_total;
      let period_total_other_income= response.data.data.period_1_net_other_income;
      let period_total_other_expences= response.data.data.period_1_net_other_expenses;

      // Income = Ordinary Income (period_1_net_ordinary_income) − Other Income (period_1_other_income_total)
      // Ordinary Income = Gross Income (period_1_gross_income) − Operating Expenses (period_1_operating_expenses_total)
      // Other Income = Total Other Income (period_1_net_other_income) − Total Other Expenses (NOT FOUND in doceasy used period_1_net_other_expenses)

      // we have to go in order
      // first calculate Other Income
      let otherIncome = calculatenetOtherIncome(Number(period_total_other_income), Number(period_total_other_expences));
      // then Ordinary Income
      let ordinaryIncome = calculateOrdinaryIncome(Number(period_gross_income), Number(period_operating_expences));
      // finally we can calcuate the total by the above 2 values
      let netIncome = calculateNetIncome(Number(ordinaryIncome),Number(otherIncome));
      //);

      console.log("Net Other Income:", otherIncome);
      console.log("Net Ordinary Income:", ordinaryIncome);
      console.log("Net Income:", netIncome);

      result = netIncome; // setting it to result
      //result = response.data; // this is only for debugging purpose
    } // end of else

    reply.code(200).send({
      "Net Income": result,
    });
  } catch (error) {
    console.error("Error fetching balance sheet summary:", error);
    reply.code(500).send({ status: "error", message: "Internal Server Error" });
  }
};
