import { ApolloServer, gql } from "apollo-server";

/*
The logic should be
backend sends us the authentication_token and the querey
Apollo server will take them
1. we don't bother decoding authentication_token at this moment, DocEasy will handle it
2. we will just pass all the info to DocEasy and get the response
*/

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

// we need another function to call doceasy and
const resolvers = {
	Query: {
		authentication_token: () => "3nt6028h98cng",
		document_type: () => "profit_loss",
		doceasy_json_string: () => doceasy_json_string,
	},
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
