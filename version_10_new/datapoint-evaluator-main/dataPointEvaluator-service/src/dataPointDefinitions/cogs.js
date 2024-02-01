module.exports = {
    name: 'cogs',
    sources: [
        { source: 'cogsSource1', trustRating: 90 },
        { source: 'cogsSource2', trustRating: 80 }
    ]
};

//Note: update the source structure to look like below
//{ source: DocEasy, endpoint: profitLoss, property: cogs, trustRating: 90}
//{ source: Plaid, endpoint: insights, property: cogs, trustRating: 90}

//Trust rating could have a document level trust source however we could also have an individual trust rating

//Under data sources we would have definitions that would act as the adapter for Plaid and define the API call, recieved the data, transforms the data as necessary, and ultiately return the data to the datapoint evaulator

