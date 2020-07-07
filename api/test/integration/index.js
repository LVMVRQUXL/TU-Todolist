const describe = require('mocha').describe;
const app = require('express')();

const tasks = require('./tasks.integration-test');

describe('INTEGRATION TESTINGS', () => tasks(app));
