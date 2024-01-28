import { ApolloServer, gql } from "apollo-server";

// create type definition
const typeDefs = gql`
  type Query {
    period_1_cogs_total: String
    period_1_gross_income: String
    period_1_gross_revenue: String
    period_1_name: String
    period_1_net_income: String
    period_1_net_ordinary_income: String
    period_1_net_other_income: String
    period_1_operating_expenses_depreciation: String
    period_1_operating_expenses_interest: String
    period_1_operating_expenses_taxes_licenses: String
    period_1_operating_expenses_total: String
    period_1_other_income_interest_income: String
    period_1_other_income_total: String
    period_1_net_other_expenses: String
  }
`;

// we need another function to call doceasy and
const resolvers = {
  Query: {
    period_1_cogs_total: () => "2015.25",
    period_1_gross_income: () => "496225.22",
    period_1_gross_revenue: () => "498240.0",
    period_1_name: () => "January - December 2021",
    period_1_net_income: () => "-245060.98",
    period_1_net_ordinary_income: () => "-246687.3",
    period_1_net_other_income: () => "1626.32",
    period_1_operating_expenses_depreciation: () => "190078.38",
    period_1_operating_expenses_interest: () => "3559.88",
    period_1_operating_expenses_taxes_licenses: () => "10192.75",
    period_1_operating_expenses_total: () => "742912.0",
    period_1_other_income_interest_income: () => "1626.32",
    period_1_other_income_total: () => "1626.32",
    period_1_net_other_expenses: () => "0"
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
