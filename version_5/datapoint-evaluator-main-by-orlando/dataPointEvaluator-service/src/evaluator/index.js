// evaluator/index.js

const dataSources = require('../dataSources');
const definitions = require('../dataPointDefinitions');

const fetchDataFromSources = async (sources) => {
    sources.sort((a, b) => b.trustRating - a.trustRating);

    for (const source of sources) {
        try {
            const data = await dataSources[source.source]();
            if (data !== null && data !== undefined) {
                return data;
            }
        } catch (error) {
            console.warn(`Error fetching data from source ${source.source}:`, error);
        }
    }
    return null;
};

const evaluateDataPoint = async (dataPointName, periods) => {
    const dataPointDef = definitions[dataPointName];
    if (!dataPointDef) {
        throw new Error(`No definition found for data point ${dataPointName}`);
    }

    const results = {};
    for (const period of periods) {
        let value;

        // Attempt to get value from sources
        if (dataPointDef.sources) {
            value = await fetchDataFromSources(dataPointDef.sources);
        }

        // If no value from sources and a calculation exists, perform the calculation
        if ((value === null || value === undefined) && dataPointDef.calculation) {
            // Assuming dependent data points are already evaluated and passed in `data`
            const dependentData = {}; // Populate with evaluated dependent data points
            for (const dep of dataPointDef.calculation.dependencies) {
                dependentData[dep] = await evaluateDataPoint(dep, [period]);
            }
            value = dataPointDef.calculation(dependentData);
        }

        results[period] = value;
    }

    return results;
};

module.exports = evaluateDataPoint;
