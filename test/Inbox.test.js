const assert = require('assert');
const ganache = require('ganache-cli');
//web3 is capitalized because it is a constructor function
const Web3 = require('web3');

const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const INITIAL_STRING = 'Hello world';

beforeEach(async () => {
   // Get a list of all accounts
   accounts = await web3.eth.getAccounts();

   // Use one of those accounts to deploy the contract
   inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({
         data: bytecode,
         arguments: [INITIAL_STRING],
      })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
   it('deploys a contract', () => {
      assert.ok(inbox.options.address);
   });

   it('has a default message', async () => {
      const message = await inbox.methods.message().call();
      assert.equal(message, INITIAL_STRING);
   });

   it('can change the message', async () => {
      await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
      const message = await inbox.methods.message().call();
      assert.equal(message, 'Bye');
   });
});
