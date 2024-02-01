const cache = {};

function cacheKey(sourceName, period) {
  return `${sourceName}-${period}`;
}

function setCache(key, data) {
  cache[key] = {
    timestamp: Date.now(),
    data
  };
}

function getCache(key, expiration = 3600000) { // 1 hour expiration as default
  const entry = cache[key];
  if (!entry) return null;

  if (Date.now() - entry.timestamp > expiration) {
    delete cache[key];
    return null;
  }

  return entry.data;
}

function withCache(sourceFunction, sourceName) {
  return async (period) => {
    const key = cacheKey(sourceName, period);
    const cachedData = getCache(key);
    if (cachedData !== null) {
      return cachedData;
    }

    const data = await sourceFunction(period);
    setCache(key, data);
    return data;
  };
}

// Defining data source functions here
const dataSources = {
  cogsSource1: async (period) => {
    const data = {
      '2021-Q1': 100,
      '2021-Q2': 105,
      // Add more periods as needed
    };
    return data[period];
  },
  cogsSource2: async (period) => {
    const data = {
      '2021-Q1': 110,
      '2021-Q2': 115,
      // Add more periods as needed
    };
    return data[period];
  },
  grossRevenueSource1: async (period) => {
    const data = {
      '2021-Q1': 1000,
      '2021-Q2': 1050,
      // Add more periods as needed
    };
    return data[period];
  },
  grossRevenueSource2: async (period) => {
    const data = {
      '2021-Q1': 1050,
      '2021-Q2': 1100,
      // Add more periods as needed
    };
    return data[period];
  }
  // Add additional data sources as needed
};

// Wrap each data source with caching
for (const [sourceName, sourceFunction] of Object.entries(dataSources)) {
  dataSources[sourceName] = withCache(sourceFunction, sourceName);
}

module.exports = dataSources;

//Don't use this for dummy data. Reserve it for
