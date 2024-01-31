// evaluator/index.js
const dataSources = require('../dataSources/dataSources');
const definitions = require('../dataPointDefinitions');

const fetchDataFromSources = async (sources) => {
    sources.sort((a, b) => b.trustRating - a.trustRating);
    console.log("Sorted sources based on trustRating:", sources);

    for (const source of sources) {
        try {
            console.log(`Fetching data from source: ${source.source}`);
            const data = await dataSources[source.source]();
            console.log(`Data from source ${source.source}:`, data);

            if (data !== null && data !== undefined) {
                return data;
            }
        } catch (error) {
            console.warn(`Error fetching data from source ${source.source}:`, error);
        }
    }
    console.log("No valid data found in any source");
    return null;
};

const evaluateDataPoint = async (dataPointName, periods) => {
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
            value = await fetchDataFromSources(dataPointDef.sources);
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
};

module.exports = evaluateDataPoint;
