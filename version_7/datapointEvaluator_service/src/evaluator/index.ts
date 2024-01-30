import app from "./app";
import { ApolloServer, gql } from "apollo-server";
import axios from 'axios';

export const handler = (req: any, res: any) => {
  app.ready((err) => {
    if (err) throw err;
    app.server.emit("request", req, res);
  });
};

const start = async () => {
  try {
    await app.listen({ port: 8080 });
    console.log(`Server listening on port 8080`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const doceasy_json_object = {
	data: {
		"period_1_cogs_total": [25],
		"period_1_gross_revenue": [100],
		"period_1_gross_income": [200],
		"period_1_net_ordinary_income": [50],
		"period_1_net_other_income": [100],
		"period_1_operating_expenses_total": [50],
		"period_1_other_income_total": [50],
		"period_1_net_other_expenses": [50],
	},
};
const doceasy_json_string = JSON.stringify(doceasy_json_object);

// create type definition
const typeDefs = gql`
	type Query {
		authentication_token: String
		document_type: String
		doceasy_json_string: String
	}
`;

async function fetchData(): Promise<string | null> {
  try {
    const response = await axios.get('http://localhost:8080/modules/cashflow/netincome');

    if (typeof response.data === 'object') {
      // Convert response.data to a string
      return JSON.stringify(response.data);
    } else {
      // If response.data is not an object, return it directly
      return response.data.toString();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

const resolvers = {
  Query: {
    authentication_token: () => "3nt6028h98cng",
    document_type: () => "profit_loss",
    doceasy_json_string: async () => {
      try {
        // Call fetchData() and wait for it to resolve
        const response = await fetchData();
        // Return the fetched data
        console.log('backend Response 234:', response);
        return response;
      } catch (error) {
        console.error('Error in fetching data:', error);
        return null;
      }
    },
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

start();
