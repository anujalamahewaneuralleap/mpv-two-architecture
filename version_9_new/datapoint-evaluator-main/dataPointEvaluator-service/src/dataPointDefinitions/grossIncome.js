module.exports = {
    name: 'grossIncome',
    calculation: {
        dependencies: ['grossRevenue', 'cogs'], // Add dependencies
        compute: (data) => data.grossRevenue - data.cogs
    }
};

