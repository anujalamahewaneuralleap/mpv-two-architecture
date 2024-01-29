import { ApolloServer, gql } from "apollo-server";

/*
The logic should be
backend sends us the authentication_token and the querey
Apollo server will take them
1. we don't bother decoding authentication_token at this moment, DocEasy will handle it
2. we will just pass all the info to DocEasy and get the response
*/

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
      "period_1_net_other_expenses": [0]
    },
    "document_date": "2021",
    "document_name": "user_document/wade/profit & loss/EMT Holdings - PNL 2021.pdf",
    "document_parsed_datetime": "Thu, 11 Jan 2024 15:04:21 GMT",
    "document_type": "profit_loss",
    "document_update_datetime": "Thu, 11 Jan 2024 18:39:36 GMT",
    "document_upload_datetime": "Thu, 11 Jan 2024 15:04:21 GMT",
    "userID": "3nt6028h98cng"
  }
;

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
    doceasy_json_string: () => doceasy_json_string
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
