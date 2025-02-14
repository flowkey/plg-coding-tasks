# Server

This is a simple [GraphQL](https://graphql.org/) server implementation using [Apollo](https://www.apollographql.com/).

## Run the server

- `npm install`
- `npm start`

## GraphQL

Once the server starts, the GraphQL API is available on http://localhost:4000/graphql

You can test your queries and mutations in GraphQL Playground by visiting the [endpoint](http://localhost:4000/graphql) in your browser or you can use [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer)

### Queries

A simple Hello, World! query. Just to make sure your server is up and running

```gql
query HelloWorld {
    hello
}
```

## Linting

This repo contains a basic linting setup using [eslint](https://eslint.org/) and [prettier](https://prettier.io/).
You can setup your editor to show (and auto-fix on save) linting errors, e.g. using the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

You can also run:

- `npm run eslint` to show linting errors
- `npm run eslint-fix` to auto-fix linting errors
