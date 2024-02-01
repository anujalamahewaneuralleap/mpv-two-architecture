# Data Point Evaluator Service

## Overview
This project provides a GraphQL API for evaluating financial data points over specified periods. It's designed to fetch and calculate data points like cogs, grossIncome, and grossRevenue from various sources.

Getting Started

* Installing Dependencies

`npm install`

* Starting the Server

`npm start`

## Sample Queries

* Evaluate a Single Data Point Over Multiple Periods

query {
  evaluateDataPoint(dataPointName: "cogs", periods: ["2022Q1", "2022Q2"]) {
    period
    value
  }
}

* Evaluate Multiple Data Points for a Specific Period

query {
  evaluateDataPoints(dataPoints: [
    { name: "cogs", periods: ["2022Q1", "2022Q2"] },
    { name: "grossRevenue", periods: ["2022Q1"] }
  ]) {
    dataPointName
    period
    value
  }
}

* Accept currentPeriod and historicPeriods

query {
  evaluateDataPoints(dataPoints: [
    { 
      name: "cogs", 
      currentPeriod: true,
      historicPeriod: 3
    },
    { 
      name: "grossRevenue", 
      currentPeriod: true,
      historicPeriod: 2
    }
  ]) {
    dataPointName
    currentPeriod
    historicPeriod
  }
}
