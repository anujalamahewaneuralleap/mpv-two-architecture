import { ApolloServer, gql } from "apollo-server";

// Update your type definitions to include an additional field
const typeDefs = gql`
  type Query {
    net_ordinary_income: String
    net_other_income: String
  }
`;

// Update your resolvers to handle the new fields
const resolvers = {
  Query: {
    net_ordinary_income: () => "10000", // doceasy shoud send
    net_other_income: () => "5000", // doceasy shoud send
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
