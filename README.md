# Gasless minting solution

This is a gasless minting solution for a deployed ERC721 NFT smart contract. It contains two sub-repos:

1. `smart_contracts` - the repo with a DefaultNFT.sol, a smart contract designed to be a typical exmple of an ERC721 smart contract.
2. `backend` - the repo with a NodeTS Express web-service that implements the gasless feature itself. It's flexibility allows it to operate with the DefaultNFT collection or any other deployed ERC721.

You should start with setting up the smart_contracts to deploy a test collection.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deploying the DefaultNFT](#deploying-the-defaultnft)
- [Setting up the gasless minting web-service](#setting-up-the-gasless-minting-web-service)
- [Contributing](#contributing)

## Prerequisites

Before running the solution make sure you have installed:

1. Node v20.4.0
2. yarn package manager

## Deploying the DefaultNFT

### Configuration

Inside `smart_contracts` folder copy the `.env.example` file and rename it to `.env`.
Inside `.env` input the following variables:

1.  `DEPLOY_RPC_URL` - the rpc url (Mumbai testnet is recomended for tests)
2.  `DEPLOY_PRIV_KEY` the private key that will be used to deploy the smart contract.

### Deployment and testing

1. In your terminal open the `smart_contracts` folder
2. Run `yarn install` to install the dependencies
3. Run `yarn test` to test the contract.
4. Run `yarn deploy` to deploy the contract. In the console you will see the message: `<CONTRACT_NAME> successfully deployed to <CONTARCT_ADDRESS>`.

The name and symbol of the contract to deploy are specified in `./scripts/settings.ts`.

## Setting up the gasless minting web-service

### Configuration

Inside `backend` folder copy the `.env.example` file and rename it to `.env`.
Inside `.env` input the following variables:

1.  `PORT` - the port the the web-service will use (8080 by default)
2.  `ALCHEMY_API_KEY` - Alchemy API key, you can get it at https://auth.alchemy.com/.
3.  `ADMIN_PRIV_KEY` - The private key of the owner of the deployed NFT collection.
4.  `SMART_CONTRACT_ADDRESS` - The address of the deployed NFT collection.
5.  `MAX_SUPPLY_NAME` - The name of the variable inside the smart_contract the represents the collections maximum supply. By default its `MAX_SUPPLY`. If a collection has no such variable - leave this field empty.
6.  `RPC_URL` - the rpc url (Mumbai testnet is recomended for tests).

After setting up the `.env` file open `./src/alchemy_config.ts`.
Input the `network` - the name of the blochain with the deployed ERC721 collection (Mumbai by default).

### ⚠️ Warning: Make sure `network` is set to a testnet before running run `yarn test` ⚠️

### Running and testing the web-service

1. In your terminal open the `backend` folder
2. Run `yarn install` to install the dependencies
3. Run `yarn test` to test the web-service.
4. Run `yarn run` or `yarn run:dev` to run the web-service.

### Swagger documentation

All the routes are documented with Swagger.
After successful run of the app you can use `<url>/api-docs` to try the app functionalities. You can also have a JSON version at `<url>/api-docs.json`

### ⚠️ Warning: Using Custom Smart Contracts ⚠️

If you are not using the DefaultNFT smart contracts provided in this solution, please do the following:

1. Put your smart contract code into `smart_contracts/contracts` folder
2. Run `npx hardhat compile` from the terminal opened in `smart_contracts` folder.
3. 3.Copy the generated `typechain_types` to the `backend` folder replacing the old one.

This application defines the following routes:

- `/` - Displays a welcome message.
- `/listItems` - Lists minted NFTs of a collection and amount of NFTs available to mint.
- `/purchase/{userAddress}/{nftQuantity}` - Mints requested quantity of NFTs to a provided user address.

You can add more routes by modifying the `index.ts` file.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to merge your changes into the main repository.

Please ensure your code follows the project's coding style and conventions.
