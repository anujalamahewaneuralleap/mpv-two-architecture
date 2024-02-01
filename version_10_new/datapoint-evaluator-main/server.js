const { ApolloServer, gql } = require('apollo-server');
const evaluateDataPoint = require('./dataPointEvaluator-service/src/evaluator');

// Type definitions for your schema
const typeDefs = gql`
type Query {
  evaluateDataPoints(dataPoints: [DataPointInput!]!): [DataPointResult]
}

input DataPointInput {
  name: String!
  periods: [String!]!
}

type DataPointResult {
  dataPointName: String
  period: String
  value: Float
}
`;


// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    evaluateDataPoints: async (_, { dataPoints }) => {
      const results = [];

      for (const dataPoint of dataPoints) {
        for (const period of dataPoint.periods) {
          const value = await evaluateDataPoint(dataPoint.name, [period]);
          results.push({
            dataPointName: dataPoint.name,
            period,
            value: value[period]
          });
        }
      }

      return results;
    }
  }
};


// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

//Paramters we have are currentPeriod and historicPeriods
//currentPeriod: boolean. For bank stamenets the current period is the current month
//historicPeriod: integer value. The number if historic periods you want

//Not specifiying month, quarter, year

//Logic around computing data is centralized on the backend instead of the frontend needing to figure out the logic

//Add logic for calculating periods
