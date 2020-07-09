const describe = require('mocha').describe;
const app = require('express')();

const tasks = require('./tasks');

describe('INTEGRATION TESTINGS', () => tasks.tests(app));
