## Description

- A small NodeJs application that serves the endpoint called /transfers.

### To run this project you need to take the following steps:

1. Install NodeJS [NodeJS](https://nodejs.org/en/).
1. A code editor [VS code] (https://code.visualstudio.com/download)
1. Clone the repository [Github] (git clone https://github.com/chrischeks/assignment.git)
1. Install the project dependencies
1. Run the application

## USE

- After running the application, you can send a POST request to (http://localhost:3000/transfers) using CURL, Postman, etc
- In-memory wallets were created. Therefore, payloads has to match any of the wallets available
- There's a sample payload in a root level file named .payload-example

## Project Clone

```bash
$ git clone (https://github.com/chrischeks/assignment.git)

```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev

# production mode
$ npm start
```

## Test

```bash
# Integration tests
$ npm run test
```
