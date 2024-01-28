import { ApolloServer, gql } from "apollo-server";

// Update your type definitions to include an additional field
const typeDefs = gql`
  type Query {
    period_ordinary_income: String
    period_other_income: String
    period_gross_income: String
    period_operating_expences: String
    period_total_other_income: String
    period_total_other_expences: String
  }
`;

// Update your resolvers to handle the new fields
const resolvers = {
  Query: {
    period_ordinary_income: () => "40", // doceasy shoud send
    period_other_income: () => "10", // doceasy shoud send

    period_gross_income: () => "50", // doceasy shoud send
    period_operating_expences: () => "10", // doceasy shoud send

    period_total_other_income: () => "20", // doceasy shoud send
    period_total_other_expences: () => "10" // doceasy shoud send
  },
};

/*
Calculation

Income = Ordinary Income − Other Income
Ordinary Income = Gross Income − Operating Expenses
Other Income = Total Other Income − Total Other Expenses

*/

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
