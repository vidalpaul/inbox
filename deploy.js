// deploy code will go here
// https://rinkeby.infura.io/v3/dac6b55872f34b2fb12c842a26b346ba
// .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const accountMnemonic = require('./.secret/keys.js');

const provider = new HDWalletProvider(
   accountMnemonic,
   'https://rinkeby.infura.io/v3/dac6b55872f34b2fb12c842a26b346ba'
);

const web3 = new Web3(provider);

const deploy = async () => {
   const accounts = await web3.eth.getAccounts();
   console.log('Attempting to deploy from account ', accounts[0]);
   const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
         data: bytecode,
         arguments: ['Hello world'],
      })
      .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

   console.log('Contract deployed to ', result.options.address);
};

deploy();
