const dataSources = require('../dataSources/dataSources');
const definitions = require('../dataPointDefinitions');

//This approach fetches data from multiple sources concurrently, reducing waiting time.

const fetchDataFromSources = async (sources, period) => {
    sources.sort((a, b) => b.trustRating - a.trustRating);

    const fetchPromises = sources.map(source => {
        const sourceFunction = dataSources[source.source];
        if (typeof sourceFunction === 'function') {
          return sourceFunction(period).catch(error => {
            console.warn(`Error fetching data from source ${source.source}:`, error);
            return null;
          });
        }
        return Promise.resolve(null);
      });
    
      const results = await Promise.all(fetchPromises);
      return results.find(data => data !== null && data !== undefined);
    };

//Explanation:
//The memoize function creates a cache for storing results of evaluateDataPoint.
//Each unique combination of dataPointName and periods is stored in the cache.
//Subsequent calls with the same arguments will return the cached result, skipping computation.

// A simple memoization function to be moved to a utils folder later
const memoize = (fn) => {
    const cache = {};
    return (...args) => {
      const key = JSON.stringify(args);
      if (!cache[key]) {
        cache[key] = fn(...args);
      }
      return cache[key];
    };
  };

const evaluateDataPoint = memoize(async (dataPointName, periods) => {
    const dataPointDef = definitions[dataPointName];
    if (!dataPointDef) {
        console.error(`No definition found for data point ${dataPointName}`);
        throw new Error(`No definition found for data point ${dataPointName}`);
    }

    console.log(`Evaluating data point: ${dataPointName} for periods:`, periods);
    const results = {};

    for (const period of periods) {
        console.log(`Evaluating period: ${period}`);
        let value;

        // Attempt to get value from sources
        if (dataPointDef.sources) {
            console.log(`Data point ${dataPointName} has sources, fetching data...`);
            value = await fetchDataFromSources(dataPointDef.sources, period);
            console.log(`Fetched value from sources for ${dataPointName}:`, value);
        }

        // If no value from sources and a calculation exists, perform the calculation
        if ((value === null || value === undefined) && dataPointDef.calculation) {
            console.log(`No value from sources, performing calculation for ${dataPointName}`);
            const dependentData = {};
            for (const dep of dataPointDef.calculation.dependencies) {
                console.log(`Fetching dependent data point: ${dep}`);
                dependentData[dep] = (await evaluateDataPoint(dep, [period]))[period];
                console.log(`Dependent data point ${dep} value:`, dependentData[dep]);
            }
            value = dataPointDef.calculation.compute(dependentData);
            console.log(`Calculated value for ${dataPointName}:`, value);
        }

        results[period] = value;
        console.log(`Result for ${dataPointName} in period ${period}:`, value);
    }

    console.log(`Final evaluation results for ${dataPointName}:`, results);
    return results;
});

module.exports = evaluateDataPoint;
