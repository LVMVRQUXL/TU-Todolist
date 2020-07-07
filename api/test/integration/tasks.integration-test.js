const {describe, it, afterEach, beforeEach} = require('mocha');
const sandbox = require('sinon').createSandbox();
const request = require('supertest');
// noinspection NodeJsCodingAssistanceForCoreModules
const assert = require('assert');

const tasksRouter = require('../../src/routers/tasks.router');
const {HttpCodeUtil, NumberUtil, ResponseUtil, StringUtil} = require('../../src/utils');
const TaskService = require('../../src/services').TaskService;

const BASE_URI = '/tasks';
const FAKE_TASK = {
    id: 1,
    content: 'test'
};

let spyNumberUtilIsZero = undefined;
let spyResponseUtilBadRequest = undefined;
let spyResponseUtilConflict = undefined;
let spyResponseUtilCreated = undefined;
let spyResponseUtilInternalServerError = undefined;
let spyResponseUtilNoContent = undefined;
let spyResponseUtilOk = undefined;
let spyStringUtilIsEmpty = undefined;

let stubTaskServiceCreate = undefined;
let stubTaskServiceFindAll = undefined;

/**
 * @param app {*}
 */
const tests = (app) => void describe('Tasks integration tests', () => {
    app.use(BASE_URI, tasksRouter);

    beforeEach(() => {
        spyResponseUtilInternalServerError = sandbox.spy(ResponseUtil, 'internalServerError');
    });
    afterEach(() => sandbox.restore());

    testGetTasks_(app);
    testPostTasks_(app);
});

/**
 * @param app {*}
 *
 * @private
 */
const testGetTasks_ = (app) => void describe(`GET ${BASE_URI}`, () => {
    beforeEach(() => {
        stubTaskServiceFindAll = sandbox.stub(TaskService, 'findAll');
        spyNumberUtilIsZero = sandbox.spy(NumberUtil, 'isZero');
        spyResponseUtilNoContent = sandbox.spy(ResponseUtil, 'noContent');
        spyResponseUtilOk = sandbox.spy(ResponseUtil, 'ok');
    });

    // noinspection JSUnresolvedFunction
    /**
     * @return {Promise<Object>}
     */
    const call = async () => await request(app).get(BASE_URI);

    /**
     * @param serviceResponse {Array<{id: number, content: string}>}
     */
    const checkServiceCallAndNoContent = (serviceResponse) => {
        sandbox.assert.calledOnce(stubTaskServiceFindAll);
        sandbox.assert.calledWithExactly(stubTaskServiceFindAll);
        sandbox.assert.calledOnce(spyNumberUtilIsZero);
        sandbox.assert.calledWithExactly(spyNumberUtilIsZero, serviceResponse.length);
    };

    const USEFUL_METHODS = {call, checkServiceCallAndNoContent};

    testGetTasks_returnsOkStatusCode_(USEFUL_METHODS);
    testGetTasks_returnsNoContentStatusCode_(USEFUL_METHODS);
});

/**
 * @param methods {Object}
 *
 * @private
 */
const testGetTasks_returnsOkStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.OK} and a singleton array of tasks`, async () => {
        // SETUP
        const tasks = [FAKE_TASK];
        const expectedResponse = {
            statusCode: HttpCodeUtil.OK,
            body: tasks
        };
        stubTaskServiceFindAll.resolves(tasks);

        // CALL
        const response = await methods.call();

        // VERIFY
        checkResponse_(response, expectedResponse);
        methods.checkServiceCallAndNoContent(tasks);
        sandbox.assert.notCalled(spyResponseUtilNoContent);
        sandbox.assert.calledOnce(spyResponseUtilOk);
        checkNoInternalSeverError_();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const testGetTasks_returnsNoContentStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.NO_CONTENT}`, async () => {
        // SETUP
        const tasks = [];
        const expectedResponse = {
            statusCode: HttpCodeUtil.NO_CONTENT,
            body: {}
        };
        stubTaskServiceFindAll.resolves(tasks);

        // CALL
        const response = await methods.call();

        // VERIFY
        checkResponse_(response, expectedResponse);
        methods.checkServiceCallAndNoContent(tasks);
        sandbox.assert.calledOnce(spyResponseUtilNoContent);
        sandbox.assert.notCalled(spyResponseUtilOk);
        checkNoInternalSeverError_();
    });

/**
 * @param app {*}
 *
 * @private
 */
const testPostTasks_ = (app) => void describe(`POST ${BASE_URI}`, () => {
    beforeEach(() => {
        spyStringUtilIsEmpty = sandbox.spy(StringUtil, 'isEmpty');
        spyResponseUtilBadRequest = sandbox.spy(ResponseUtil, 'badRequest');
        stubTaskServiceCreate = sandbox.stub(TaskService, 'create');
        spyResponseUtilConflict = sandbox.spy(ResponseUtil, 'conflict');
        spyResponseUtilCreated = sandbox.spy(ResponseUtil, 'created');
    });

    // noinspection JSUnresolvedFunction
    /**
     * @param data {Object}
     *
     * @return {Promise<Object>}
     *
     * @private
     */
    const call = async (data) => await request(app).post(BASE_URI).send(data);

    /**
     * @param dataContent {string}
     * @param pass {boolean}
     *
     * @private
     */
    const checkBadRequest = (dataContent, pass) => {
        sandbox.assert.calledOnce(spyStringUtilIsEmpty);
        sandbox.assert.calledWithExactly(spyStringUtilIsEmpty, dataContent);
        if (pass) {
            sandbox.assert.notCalled(spyResponseUtilBadRequest);
        } else {
            sandbox.assert.calledOnce(spyResponseUtilBadRequest);
        }
    };

    const USEFUL_METHODS = {call, checkBadRequest};

    testPostTasks_returnsCreatedStatusCode_(USEFUL_METHODS);
    testPostTasks_returnsBadRequestStatusCode_(USEFUL_METHODS);
    testPostTasks_returnsConflictStatusCode_(USEFUL_METHODS);
});

/**
 * @param methods {Object}
 *
 * @private
 */
const testPostTasks_returnsCreatedStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.CREATED} and created task`, async () => {
        // SETUP
        const sendData = {content: FAKE_TASK.content};
        const expectedResponse = {
            statusCode: HttpCodeUtil.CREATED,
            body: {
                id: FAKE_TASK.id,
                content: FAKE_TASK.content
            }
        };
        stubTaskServiceCreate.resolves(FAKE_TASK);

        // CALL
        const response = await methods.call(sendData);

        // VERIFY
        checkResponse_(response, expectedResponse);
        const passBadRequest = true;
        methods.checkBadRequest(sendData.content, passBadRequest);
        sandbox.assert.calledOnce(stubTaskServiceCreate);
        sandbox.assert.calledWithExactly(stubTaskServiceCreate, sendData);
        sandbox.assert.notCalled(spyResponseUtilConflict);
        sandbox.assert.calledOnce(spyResponseUtilCreated);
        checkNoInternalSeverError_();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const testPostTasks_returnsBadRequestStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.BAD_REQUEST}`, async () => {
        // SETUP
        const sendData = {content: undefined};
        const expectedResponse = {
            statusCode: HttpCodeUtil.BAD_REQUEST,
            body: {}
        };

        // CALL
        const response = await methods.call(sendData);

        // VERIFY
        checkResponse_(response, expectedResponse);
        const passBadRequest = false;
        methods.checkBadRequest(sendData.content, passBadRequest);
        sandbox.assert.notCalled(stubTaskServiceCreate);
        sandbox.assert.notCalled(spyResponseUtilConflict);
        sandbox.assert.notCalled(spyResponseUtilCreated);
        checkNoInternalSeverError_();
    });

/**
 * @param methods {Object}
 *
 * @private
 */
const testPostTasks_returnsConflictStatusCode_ = (methods) =>
    void it(`should return ${HttpCodeUtil.CONFLICT}`, async () => {
        // SETUP
        const sendData = {content: FAKE_TASK.content};
        const expectedResponse = {
            statusCode: HttpCodeUtil.CONFLICT,
            body: {}
        };
        stubTaskServiceCreate.resolves(undefined);

        // CALL
        const response = await methods.call(sendData);

        // VERIFY
        checkResponse_(response, expectedResponse);
        const passBadRequest = true;
        methods.checkBadRequest(sendData.content, passBadRequest);
        sandbox.assert.calledOnce(stubTaskServiceCreate);
        sandbox.assert.calledWithExactly(stubTaskServiceCreate, sendData);
        sandbox.assert.calledOnce(spyResponseUtilConflict);
        sandbox.assert.notCalled(spyResponseUtilCreated);
        checkNoInternalSeverError_();
    });

/**
 * @private
 */
const checkNoInternalSeverError_ = () => void sandbox.assert.notCalled(spyResponseUtilInternalServerError);

/**
 * @param response {Object}
 * @param expected {{statusCode: number, body: Object}}
 *
 * @private
 */
const checkResponse_ = (response, expected) => {
    assert.strictEqual(response.statusCode, expected.statusCode);
    assert.deepStrictEqual(response.body, expected.body);
};

exports.tests = tests;
