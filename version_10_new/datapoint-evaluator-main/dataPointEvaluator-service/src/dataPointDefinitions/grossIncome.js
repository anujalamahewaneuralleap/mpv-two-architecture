module.exports = {
    name: 'grossIncome',
    calculation: {
        dependencies: ['grossRevenue', 'cogs'], // Add dependencies
        compute: (data) => data.grossRevenue - data.cogs
    }
};

//We may need to navigate across models so keep this mind

