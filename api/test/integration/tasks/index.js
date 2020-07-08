const {describe, afterEach, beforeEach} = require('mocha');
const sandbox = require('sinon').createSandbox();
// noinspection NodeJsCodingAssistanceForCoreModules
const assert = require('assert');

const tasksRouter = require('../../../src/routers/tasks.router');
const ResponseUtil = require('../../../src/utils').ResponseUtil;

const getTasks = require('./get-tasks.integration-test');
const postTasks = require('./post-tasks.integration-test');
const getTasksId = require('./get-tasks-id.integration-test');
const deleteTasksId = require('./delete-tasks-id.integration-test');
const putTasksId = require('./put-tasks-id.integration-test');

let spyResponseUtilInternalServerError = undefined;

/**
 * @param app {*}
 */
const tests = (app) => void describe('Tasks integration tests', () => {
    const BASE_URI = '/tasks';
    app.use(BASE_URI, tasksRouter);

    beforeEach(() => {
        spyResponseUtilInternalServerError = sandbox.spy(ResponseUtil, 'internalServerError');
    });
    afterEach(() => sandbox.restore());

    const USEFUL_METHODS = {checkResponse, checkNoInternalSeverError};

    getTasks.test(app, sandbox, USEFUL_METHODS);
    postTasks.test(app, sandbox, USEFUL_METHODS);
    getTasksId.test(app, sandbox, USEFUL_METHODS);
    deleteTasksId.test(app, sandbox, USEFUL_METHODS);
    putTasksId.test(app, sandbox, USEFUL_METHODS);
});

const checkNoInternalSeverError = () => void sandbox.assert.notCalled(spyResponseUtilInternalServerError);

/**
 * @param response {Object}
 * @param expected {{statusCode: number, body: Object}}
 */
const checkResponse = (response, expected) => {
    assert.strictEqual(response.statusCode, expected.statusCode);
    assert.deepStrictEqual(response.body, expected.body);
};

exports.tests = tests;
