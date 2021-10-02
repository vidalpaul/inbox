// compile code will go here
// scheme : solidityCompiler(contractSource): (ABI, contractBytecode)
// ABI is a communication layer between the Solidity world and the JavaScript world

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];
