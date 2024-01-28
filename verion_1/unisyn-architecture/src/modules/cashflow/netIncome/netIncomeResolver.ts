import { FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import { calculate } from "../netIncome/netIncomeService";

let result = 0; // this is the final calculated value

export const netIncomeResolver = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const response = await axios.post("http://localhost:4000", {
      query: `
          query {
            net_ordinary_income,
            net_other_income
          }
        `,
    });

    if (response.data.errors) {
      console.error("GraphQL Query Error:", response.data.errors);
    } else {
      console.log("Response from Server:", response.data.data);

      // access individual values
      let net_ordinary_income = response.data.data.net_ordinary_income;
      let net_other_income = response.data.data.net_other_income;

      // sends the values to netIncomeService.calculate and get the calculation
      result = calculate(Number(net_ordinary_income), Number(net_other_income));

      console.log("Result:", result);
    } // end of else

    reply.code(200).send({
      message: result,
    });
  } catch (error) {
    console.error("Error fetching balance sheet summary:", error);
    reply.code(500).send({ status: "error", message: "Internal Server Error" });
  }
};
