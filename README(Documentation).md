# Blockstarter 4.0 Prototyping 

This work presents Blockstarter 4.0, a kickstarter-inspired project built upon the blockchain for the course Advanced Enterprise Computing at TU-Berlin, summer semester 2017. Full project's report can be found [here](https://docs.google.com/document/d/10x_wpSByBNx3hKP1il_bnHaawmnr6SIdoc-PYM9taE4/edit#). Projet's repository can be found [here](https://gitlab.tubit.tu-berlin.de/v.muehler/aec-project)


## Introduction
The main idea behind this project is to have an application that  a user can  use to present his/her projects and get funding for them, plus more features that are explained the report. In other words, it is a transaction application. But the roles that specify the process is written  in a smart contract and stored on a Blockchain with no middleman services.

The project depends on many technologies. Backend and Smart-Contract code is written in Solidity and running 'testrpc' server is needed to get some available accounts.

In the Frontend, React.js is used combined with Materialize.css to implement the 'rich-client' approach.

To connect those two parts, Backend and Frontend, a module called 'web3' is used to build the API of the application, including the deployment of the Contract and calling all the necessary Backend functions in the Frontend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

"Testrpc" has to be installed. For more information please refer to the official [repository](https://github.com/ethereumjs/testrpc)

```
npm install -g ethereumjs-testrpc
```

### Installing project

Download the "aec-project" or clone the repository using the `git clone` command.

Below you can see the project structure.
```
aec-project
├── README.md
├── .gitignore
├── blockstarter.sol
└── client
    └── package.json
    └── webpack.config.js
    └── devServer.js
    └── public
    └── src
        └── api.js
        └── Root.jsx
        └── ...
```
### Installing dependenices

Navigate to the 'client' folder and install the necessary dependencies.

```
cd client
npm install
```
### Running/Testing the app

Open a terminal and run the following command to start the 'testrpc' server.
```
testrpc
```

Open a new terminal and run the following command to start the React application.
```
cd client
node devServer.js
```

Browse to https://localhost:3000 to use the application

After loading the application the first time, the main contract is deployed and its address is stored in localstorage. Thus, after each restart of testrpc localstorage has to be cleared. Therefore enter localStorage.clear() or localStorage.setItem('contractaddress', '') in the browser console and reload the application.

## Author names and git accounts

* **Christoph Timo Runck** - Timo Runck
* **Haneen Abd Allah** -  Haneen Abd Allah
* **Israel Jonas Runk Pohl** - 
* **Jun-Zhe Lai** - Jun-Zhe Lai
* **Konstantinos Chaitas** - CostasChaitas or Konstantinos Chaitas
* **Mohabbat Khan Mohsin** - mmohsin
* **Pichaya  Kanjanapisith** -Pichaya Kanjanapisith or Pichaya.K
* **Vincent Mühler** - vincent

