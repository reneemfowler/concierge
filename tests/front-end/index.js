const path = require('path');

require('ts-node').register({
  project: path.join(__dirname, './tsconfig.json')
});

const Mocha = require('mocha');

// Configure the mocha test-runner.
// mocha.setup('bdd');
const mocha = new Mocha({
  ui: 'bdd',
  globals: ['assert']
});

// Load all tests.
const tests = [
  'unit/example'
];

tests.forEach(t => mocha.addFile(path.join(__dirname, t)));

// Run all tests.
mocha.run(failures => {
  process.exit(failures ? 1 : 0);
});
