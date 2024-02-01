const { ApolloServer, gql } = require('apollo-server');
const evaluateDataPoint = require('./dataPointEvaluator-service/src/evaluator');

// Type definitions for your schema
const typeDefs = gql`
  type Query {
    evaluateDataPoints(dataPoints: [DataPointInput!]!): [DataPointResult]
  }

  input DataPointInput {
    name: String!
    periods: [String!]
    currentPeriod: Boolean
    historicPeriod: Int
  }

  type DataPointResult {
    dataPointName: String
    currentPeriod: Boolean
    historicPeriod: Int
    period: String # Add a period field if needed
    value: Float # Add value field if needed
  }
`;


// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    evaluateDataPoints: async (_, { dataPoints }) => {
      const results = [];

      for (const dataPoint of dataPoints) {
        if (Array.isArray(dataPoint.periods)) { // Check if periods is an array
          for (const period of dataPoint.periods) {
            console.log("******************");
            console.log(dataPoint.name);
            console.log([period]);
            console.log("******************");
            const value = await evaluateDataPoint(dataPoint.name, [period]);
            results.push({
              dataPointName: dataPoint.name,
              period,
              value: value[period]
            });
          }
        } else {
          // Handle the case when periods is not an array (e.g., set value to null or handle as needed)
          results.push({
            dataPointName: dataPoint.name,
            period: null, // Set period to null or handle as needed
            value: null // Set value to null or handle as needed
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

/*
The error message "dataPoint.periods is not iterable" indicates that you're trying to iterate over dataPoint.periods, but periods might not be an iterable (such as an array) in some cases. This can happen if dataPoint.periods is undefined or not an array when processing certain elements of the dataPoints array.

To fix this issue, you should add a check to ensure that dataPoint.periods is an iterable array before attempting to loop through it. Here's how you can modify your resolver function to handle this:
*/