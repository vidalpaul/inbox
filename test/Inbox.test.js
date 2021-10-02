const assert = require('assert');
const ganache = require('ganache-cli');
//web3 is capitalized because it is a constructor function
const Web3 = require('web3');

const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
   // Get a list of all accounts
   accounts = await web3.eth.getAccounts();

   // Use one of those accounts to deploy the contract
   inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
         data: bytecode,
         arguments: ['Hello wworld'],
      })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
   it('deploys a contract', () => {
      assert.ok(inbox.options.address);
   });
});
