# Server

This is a simple [GraphQL](https://graphql.org/) server implementation using [Apollo](https://www.apollographql.com/).

## Setup

- `npm install`

- Install MongoDB, using [homebrew](https://brew.sh) or download and install from [mongodb.com](https://www.mongodb.com/try/download/community)

    ```sh
    brew install mongodb-community
    ```

- Make mongoDB data directory

    ```sh
    mkdir -p ./data/db
    ```

- Start `mongod` instance

    ```sh
    npm run start:mongo
    ```

- Populate mongodb with data

    ```sh
    npm run seed:mongo
    ```

- Optionally, stop `mongod`

    ```sh
    npm run stop:mongo
    ```

## Run the server

- `npm start`

    This also starts `mongod` in the background

## API

### GraphQL API

Once the server starts, the GraphQL API is available on http://localhost:4000/graphql

You can test your queries and mutations in GraphQL Playground by visiting the [endpoint](http://localhost:4000/graphql) in your browser or you can use [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer)

#### GraphQL queries

`HelloWorld`: a simple Hello, World! query. Just to make sure your server is up and running!

```gql
query HelloWorld {
    hello
}
```

`PricingPlans`: Fetches pricing plans for given countryCode

```gql
query PricingPlans($countryCode: String) {
    pricingPlans(countryCode: $countryCode) {
        _id
        billingFrequency
        trialPeriodDays
        isRecommended
        currency
        price
    }
}
```

### REST or other APIs

In case you are not familiar with GraphQL or prefer using another API (e.g., REST), you are free to do so. Feel free to modify the server setup or implement an alternative API style that best suits your approach.

## Testing

This repository includes [**Jest**](https://jestjs.io) for unit testing. Tests are written in **TypeScript** and can be conveniently placed **alongside the files/functions they test**.

### Running tests

Use the following commands to run tests:

- Run all tests:
    ```sh
    npm test
    ```
- Run tests in watch mode (auto-retest on file changes):
    ```sh
    npm run test:watch
    ```
- Run tests with coverage report:
    ```sh
    npm run test:coverage
    ```

### Example test file

Check out a sample test file for reference:  
[`server/src/utils/calculate.test.ts`](server/src/utils/calculate.test.ts)

### Your choice of testing tools

While Jest is pre-configured, you are free to setup and use any testing framework or tool you prefer. It would be great if it supports Typescript, but doesn't have to.

### Testing is **encouraged**, but is **not required**

Writing tests is encouraged, but not mandatory. You are welcome to include tests where you feel they add value. If you prefer **TDD** or any other methodology, feel free to apply it!

## Linting

This repo contains a basic linting setup using [eslint](https://eslint.org/) and [prettier](https://prettier.io/).
You can setup your editor to show (and auto-fix on save) linting errors, e.g. using the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

You can also run:

- `npm run eslint` to show linting errors
- `npm run eslint-fix` to auto-fix linting errors
